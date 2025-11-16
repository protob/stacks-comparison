package services

import (
	"archive/zip"
	"context"
	"dam-backend/internal/db"
	"database/sql"
	"fmt"
	"io"
	"os"
	"path/filepath"
	"strings"
	"sync"
)

type DownloadService struct {
	querier           db.Querier
	collectionService *CollectionService
	projectService    *ProjectService
	ideaService       *IdeaService
	songService       *SongService
	trackService      *TrackService
}

func NewDownloadService(
	querier db.Querier,
	collectionService *CollectionService,
	projectService *ProjectService,
	ideaService *IdeaService,
	songService *SongService,
	trackService *TrackService,
) *DownloadService {
	return &DownloadService{
		querier:           querier,
		collectionService: collectionService,
		projectService:    projectService,
		ideaService:       ideaService,
		songService:       songService,
		trackService:      trackService,
	}
}

// FileEntry represents a file to be added to the zip
type FileEntry struct {
	SourcePath string // Absolute path on disk
	ZipPath    string // Path inside the zip file
}

// sanitizeName cleans a name for use in file paths
func sanitizeName(name string) string {
	// Replace problematic characters
	name = strings.ReplaceAll(name, "/", "-")
	name = strings.ReplaceAll(name, "\\", "-")
	name = strings.ReplaceAll(name, ":", "-")
	name = strings.ReplaceAll(name, "*", "-")
	name = strings.ReplaceAll(name, "?", "-")
	name = strings.ReplaceAll(name, "\"", "-")
	name = strings.ReplaceAll(name, "<", "-")
	name = strings.ReplaceAll(name, ">", "-")
	name = strings.ReplaceAll(name, "|", "-")
	name = strings.TrimSpace(name)
	if name == "" {
		name = "unnamed"
	}
	return name
}

// DownloadCollection creates a zip file for an entire collection
func (s *DownloadService) DownloadCollection(ctx context.Context, collectionID string, zipWriter *zip.Writer) error {
	// Get collection
	collection, err := s.collectionService.GetCollection(ctx, collectionID)
	if err != nil {
		return fmt.Errorf("failed to get collection: %w", err)
	}

	collectionName := sanitizeName(collection.Name)

	// Get all projects in collection
	projects, err := s.projectService.ListProjectsByCollection(ctx, collectionID)
	if err != nil {
		return fmt.Errorf("failed to list projects: %w", err)
	}

	// Collect all files concurrently
	var wg sync.WaitGroup
	fileChan := make(chan FileEntry, 100)
	errorChan := make(chan error, 1)

	// Start workers to process projects
	for _, project := range projects {
		wg.Add(1)
		go func(proj db.Project) {
			defer wg.Done()
			projectName := sanitizeName(proj.Name)
			basePath := filepath.Join(collectionName, projectName)

			if err := s.collectProjectFiles(ctx, proj.ID, basePath, fileChan); err != nil {
				select {
				case errorChan <- err:
				default:
				}
			}
		}(project)
	}

	// Close fileChan when all workers are done
	go func() {
		wg.Wait()
		close(fileChan)
		close(errorChan)
	}()

	// Check for errors
	if err := <-errorChan; err != nil {
		return err
	}

	// Add all collected files to zip
	return s.addFilesToZip(fileChan, zipWriter)
}

// DownloadProject creates a zip file for a project
func (s *DownloadService) DownloadProject(ctx context.Context, projectID string, zipWriter *zip.Writer) error {
	// Get project
	project, err := s.projectService.GetProject(ctx, projectID)
	if err != nil {
		return fmt.Errorf("failed to get project: %w", err)
	}

	projectName := sanitizeName(project.Name)

	// Collect all files
	fileChan := make(chan FileEntry, 100)
	errorChan := make(chan error, 1)

	go func() {
		if err := s.collectProjectFiles(ctx, projectID, projectName, fileChan); err != nil {
			errorChan <- err
		}
		close(fileChan)
		close(errorChan)
	}()

	// Check for errors
	if err := <-errorChan; err != nil {
		return err
	}

	// Add all collected files to zip
	return s.addFilesToZip(fileChan, zipWriter)
}

// DownloadIdea creates a zip file for an idea
func (s *DownloadService) DownloadIdea(ctx context.Context, ideaID string, zipWriter *zip.Writer) error {
	// Get idea
	idea, err := s.ideaService.GetIdea(ctx, ideaID)
	if err != nil {
		return fmt.Errorf("failed to get idea: %w", err)
	}

	ideaName := sanitizeName(idea.Name)

	// Collect all files
	fileChan := make(chan FileEntry, 100)
	errorChan := make(chan error, 1)

	go func() {
		if err := s.collectIdeaFiles(ctx, ideaID, ideaName, fileChan); err != nil {
			errorChan <- err
		}
		close(fileChan)
		close(errorChan)
	}()

	// Check for errors
	if err := <-errorChan; err != nil {
		return err
	}

	// Add all collected files to zip
	return s.addFilesToZip(fileChan, zipWriter)
}

// DownloadSong creates a zip file for a song
func (s *DownloadService) DownloadSong(ctx context.Context, songID string, zipWriter *zip.Writer) error {
	// Get song
	song, err := s.songService.GetSong(ctx, songID)
	if err != nil {
		return fmt.Errorf("failed to get song: %w", err)
	}

	songName := sanitizeName(song.Name)

	// Collect all files
	fileChan := make(chan FileEntry, 100)
	errorChan := make(chan error, 1)

	go func() {
		if err := s.collectSongFiles(ctx, songID, songName, fileChan); err != nil {
			errorChan <- err
		}
		close(fileChan)
		close(errorChan)
	}()

	// Check for errors
	if err := <-errorChan; err != nil {
		return err
	}

	// Add all collected files to zip
	return s.addFilesToZip(fileChan, zipWriter)
}

// collectProjectFiles collects all track files from a project's ideas and songs
func (s *DownloadService) collectProjectFiles(ctx context.Context, projectID string, basePath string, fileChan chan<- FileEntry) error {
	ideas, err := s.ideaService.ListIdeasByProject(ctx, projectID)
	if err != nil {
		return fmt.Errorf("failed to list ideas: %w", err)
	}

	var wg sync.WaitGroup
	errChan := make(chan error, len(ideas))

	for _, idea := range ideas {
		wg.Add(1)
		go func(i db.Idea) {
			defer wg.Done()
			ideaName := sanitizeName(i.Name)
			ideaPath := filepath.Join(basePath, ideaName)

			if err := s.collectIdeaFiles(ctx, i.ID, ideaPath, fileChan); err != nil {
				errChan <- err
			}
		}(idea)
	}

	wg.Wait()
	close(errChan)

	// Check for errors
	for err := range errChan {
		if err != nil {
			return err
		}
	}

	return nil
}

// collectIdeaFiles collects all track files from an idea's songs
func (s *DownloadService) collectIdeaFiles(ctx context.Context, ideaID string, basePath string, fileChan chan<- FileEntry) error {
	songs, err := s.songService.ListSongsByIdea(ctx, ideaID)
	if err != nil {
		return fmt.Errorf("failed to list songs: %w", err)
	}

	var wg sync.WaitGroup
	errChan := make(chan error, len(songs))

	for _, song := range songs {
		wg.Add(1)
		go func(sng db.Song) {
			defer wg.Done()
			songName := sanitizeName(sng.Name)
			songPath := filepath.Join(basePath, songName)

			if err := s.collectSongFiles(ctx, sng.ID, songPath, fileChan); err != nil {
				errChan <- err
			}
		}(song)
	}

	wg.Wait()
	close(errChan)

	// Check for errors
	for err := range errChan {
		if err != nil {
			return err
		}
	}

	return nil
}

// collectSongFiles collects all track files from a song
func (s *DownloadService) collectSongFiles(ctx context.Context, songID string, basePath string, fileChan chan<- FileEntry) error {
	tracks, err := s.querier.ListTracksBySong(ctx, sql.NullString{String: songID, Valid: true})
	if err != nil {
		return fmt.Errorf("failed to list tracks: %w", err)
	}

	for i, track := range tracks {
		// Check if file exists
		if _, err := os.Stat(track.FilePath); os.IsNotExist(err) {
			continue // Skip missing files
		}

		// Get file extension
		ext := filepath.Ext(track.FilePath)

		// Create filename: use track title or fallback to numbered format
		var filename string
		if track.Title != "" {
			filename = sanitizeName(track.Title) + ext
		} else {
			filename = fmt.Sprintf("track_%d%s", i+1, ext)
		}

		zipPath := filepath.Join(basePath, filename)

		// Send to channel for processing
		fileChan <- FileEntry{
			SourcePath: track.FilePath,
			ZipPath:    zipPath,
		}
	}

	return nil
}

// addFilesToZip writes all collected files to the zip archive
func (s *DownloadService) addFilesToZip(fileChan <-chan FileEntry, zipWriter *zip.Writer) error {
	// Use a map to track unique zip paths and avoid duplicates
	seenPaths := make(map[string]bool)

	for entry := range fileChan {
		// Handle duplicate paths by appending a number
		originalPath := entry.ZipPath
		ext := filepath.Ext(originalPath)
		basePath := originalPath[:len(originalPath)-len(ext)]
		counter := 1

		for seenPaths[entry.ZipPath] {
			entry.ZipPath = fmt.Sprintf("%s_%d%s", basePath, counter, ext)
			counter++
		}
		seenPaths[entry.ZipPath] = true

		// Open source file
		sourceFile, err := os.Open(entry.SourcePath)
		if err != nil {
			return fmt.Errorf("failed to open source file %s: %w", entry.SourcePath, err)
		}

		// Create zip entry
		// Normalize path separators for zip format (always use forward slashes)
		zipPath := filepath.ToSlash(entry.ZipPath)
		zipFile, err := zipWriter.Create(zipPath)
		if err != nil {
			sourceFile.Close()
			return fmt.Errorf("failed to create zip entry %s: %w", entry.ZipPath, err)
		}

		// Copy file contents
		_, err = io.Copy(zipFile, sourceFile)
		sourceFile.Close()
		if err != nil {
			return fmt.Errorf("failed to copy file %s to zip: %w", entry.SourcePath, err)
		}
	}

	return nil
}
