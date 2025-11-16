package services

import (
	"context"
	"crypto/rand"
	"database/sql"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"io"
	"os"
	"path/filepath"
	"strings"
	"sync"
	"time"
	"dam-backend/internal/config"
	"dam-backend/internal/db"
	"github.com/tcolgate/mp3"
)

type ScannerService struct {
	cfg     *config.Config
	querier db.Querier
}

func NewScannerService(cfg *config.Config, querier db.Querier) *ScannerService {
	return &ScannerService{
		cfg:     cfg,
		querier: querier,
	}
}

// ScanResult represents discovered tracks
type ScanResult struct {
	TotalFound      int      `json:"total_found"`
	NewTracks       int      `json:"new_tracks"`
	ExistingTracks  int      `json:"existing_tracks"`
	Errors          []string `json:"errors,omitempty"`
}

// SunoTrack represents a track entry in the Suno JSON files
type SunoTrack struct {
	UUID     string `json:"uuid"`
	Title    string `json:"title"`
	Tags     string `json:"tags"`      // This is actually the style/prompt description
	AudioURL string `json:"audio_url"` // Ignored (already downloaded)
	ImageURL string `json:"image_url"` // Ignored (already downloaded)
}

// getMp3Duration extracts duration from an MP3 file
func getMp3Duration(filePath string) (int64, error) {
	f, err := os.Open(filePath)
	if err != nil {
		return 0, err
	}
	defer f.Close()

	decoder := mp3.NewDecoder(f)
	var duration time.Duration
	var frame mp3.Frame
	skipped := 0

	for {
		if err := decoder.Decode(&frame, &skipped); err != nil {
			if err == io.EOF {
				break
			}
			return 0, err
		}
		duration += frame.Duration()
	}

	return int64(duration.Milliseconds()), nil
}

// ScanSunoFolders scans all Suno output folders (or just first one in debug mode)
func (s *ScannerService) ScanSunoFolders(ctx context.Context) (*ScanResult, error) {
	result := &ScanResult{}

	sunoPath := filepath.Join(s.cfg.AssetsPath, "suno", "output")
	jsonPath := filepath.Join(s.cfg.AssetsPath, "suno", "json")
	fmt.Printf("🔍 Starting Suno scan: %s\n", sunoPath)
	if s.cfg.DebugScanLimit {
		fmt.Printf("⚠️  DEBUG MODE: Only scanning first folder\n")
	}

	// List numbered folders (1, 2, 3, ...)
	entries, err := os.ReadDir(sunoPath)
	if err != nil {
		return nil, fmt.Errorf("failed to read suno directory: %w", err)
	}

	foldersProcessed := 0
	for _, entry := range entries {
		if !entry.IsDir() {
			continue
		}

		// Apply debug limit if set
		if s.cfg.DebugScanLimit && foldersProcessed >= 1 {
			fmt.Printf("⏹️  Debug limit reached, stopping scan\n")
			break
		}

		folderName := entry.Name()
		folderPath := filepath.Join(sunoPath, folderName)

		// Load corresponding JSON metadata
		jsonFile := filepath.Join(jsonPath, folderName+".json")
		metadata, err := s.loadSunoMetadata(jsonFile)
		if err != nil {
			fmt.Printf("⚠️  Warning: Could not load metadata for folder %s: %v\n", folderName, err)
			metadata = make(map[string]SunoTrack) // Empty metadata
		}

		// Scan MP3s in this folder
		mp3Dir := filepath.Join(folderPath, "mp3")
		imgDir := filepath.Join(folderPath, "image")

		fmt.Printf("  📁 Scanning folder: %s (%d metadata entries)\n", folderName, len(metadata))
		if err := s.scanSunoFolder(ctx, mp3Dir, imgDir, metadata, result); err != nil {
			result.Errors = append(result.Errors, fmt.Sprintf("folder %s: %v", folderName, err))
		}

		foldersProcessed++
	}

	fmt.Printf("✅ Suno scan complete: %d found, %d new, %d existing, %d errors\n",
		result.TotalFound, result.NewTracks, result.ExistingTracks, len(result.Errors))

	return result, nil
}

// loadSunoMetadata loads and parses a Suno JSON metadata file
func (s *ScannerService) loadSunoMetadata(jsonFile string) (map[string]SunoTrack, error) {
	data, err := os.ReadFile(jsonFile)
	if err != nil {
		return nil, err
	}

	var tracks []SunoTrack
	if err := json.Unmarshal(data, &tracks); err != nil {
		return nil, err
	}

	// Build map keyed by UUID for fast lookup
	metadata := make(map[string]SunoTrack)
	for _, track := range tracks {
		metadata[track.UUID] = track
	}

	return metadata, nil
}

// trackToCreate holds data for a track that needs to be created
type trackToCreate struct {
	params db.CreateTrackParams
	filename string
}

func (s *ScannerService) scanSunoFolder(ctx context.Context, mp3Dir, imgDir string, metadata map[string]SunoTrack, result *ScanResult) error {
	entries, err := os.ReadDir(mp3Dir)
	if err != nil {
		return fmt.Errorf("failed to read mp3 directory: %w", err)
	}

	// Filter MP3 files
	var mp3Files []os.DirEntry
	for _, entry := range entries {
		if !entry.IsDir() && strings.HasSuffix(entry.Name(), ".mp3") {
			mp3Files = append(mp3Files, entry)
		}
	}

	// Pattern: Scan concurrently, write sequentially
	// This eliminates SQLITE_BUSY errors completely
	const numWorkers = 10
	jobs := make(chan os.DirEntry, len(mp3Files))
	tracksToCreate := make(chan trackToCreate, 100) // Buffer for tracks ready to write
	var wg sync.WaitGroup
	var mu sync.Mutex

	// Start scanner workers (check if track exists, prepare data)
	for w := 0; w < numWorkers; w++ {
		wg.Add(1)
		go func() {
			defer wg.Done()
			for entry := range jobs {
				filename := entry.Name()
				uuid := strings.TrimSuffix(filename, ".mp3")
				mp3Path := filepath.Join(mp3Dir, filename)
				imgPath := filepath.Join(imgDir, uuid+".jpg")

				mu.Lock()
				result.TotalFound++
				mu.Unlock()

				// Check if track already exists (read operation - safe to do concurrently)
				_, err := s.querier.GetTrackByFilePath(ctx, mp3Path)
				if err == nil {
					mu.Lock()
					result.ExistingTracks++
					mu.Unlock()
					continue
				}
				if err != sql.ErrNoRows {
					mu.Lock()
					result.Errors = append(result.Errors, fmt.Sprintf("error checking %s: %v", filename, err))
					mu.Unlock()
					continue
				}

				// Get metadata from JSON (if available)
				title := uuid // Default to UUID
				styleDesc := ""
				if meta, found := metadata[uuid]; found {
					if meta.Title != "" {
						title = meta.Title
					}
					styleDesc = meta.Tags // "tags" field is actually the style description
				}

				// Extract MP3 duration
				durationMs, err := getMp3Duration(mp3Path)
				if err != nil {
					fmt.Printf("    ⚠️  Failed to get duration for %s: %v\n", filename, err)
					durationMs = 0
				}

				// Prepare track data (no DB write yet)
				trackID := generateID()
				imagePath := ""
				if _, err := os.Stat(imgPath); err == nil {
					imagePath = imgPath
				}

				// Send to sequential writer
				tracksToCreate <- trackToCreate{
					params: db.CreateTrackParams{
						ID:         trackID,
						SongID:     sql.NullString{Valid: false},
						SourceType: "suno",
						FilePath:   mp3Path,
						SunoID:     sql.NullString{String: uuid, Valid: true},
						UdioID:     sql.NullString{Valid: false},
						ImagePath:  sql.NullString{String: imagePath, Valid: imagePath != ""},
						Title:      title,
						DurationMs: sql.NullInt64{Int64: durationMs, Valid: durationMs > 0},
						StyleDesc:  sql.NullString{String: styleDesc, Valid: styleDesc != ""},
						Rating:     sql.NullInt64{Valid: false},
						IsTrash:    false,
						IsDeleted:  false,
						ArtistTags: sql.NullString{String: "[]", Valid: true},
						AlbumTags:  sql.NullString{String: "[]", Valid: true},
						GenreTags:  sql.NullString{String: "[]", Valid: true},
						MoodTags:   sql.NullString{String: "[]", Valid: true},
						Tags:       sql.NullString{String: "[]", Valid: true},
						Metadata:   sql.NullString{String: "{}", Valid: true},
					},
					filename: filename,
				}
			}
		}()
	}

	// Single sequential writer goroutine (no SQLITE_BUSY possible!)
	writerDone := make(chan struct{})
	go func() {
		defer close(writerDone)
		for track := range tracksToCreate {
			_, err := s.querier.CreateTrack(ctx, track.params)
			if err != nil {
				mu.Lock()
				result.Errors = append(result.Errors, fmt.Sprintf("failed to create track %s: %v", track.filename, err))
				mu.Unlock()
			} else {
				mu.Lock()
				result.NewTracks++
				mu.Unlock()
			}
		}
	}()

	// Send jobs to scanner workers
	for _, entry := range mp3Files {
		jobs <- entry
	}
	close(jobs)

	// Wait for all scanners to finish
	wg.Wait()

	// Close the tracks channel and wait for writer to finish
	close(tracksToCreate)
	<-writerDone

	return nil
}

// ScanUdioFolders scans Udio sorted directory recursively (or limited in debug mode)
func (s *ScannerService) ScanUdioFolders(ctx context.Context) (*ScanResult, error) {
	result := &ScanResult{}
	udioPath := filepath.Join(s.cfg.AssetsPath, "udio", "sorted")
	fmt.Printf("🔍 Starting Udio scan: %s\n", udioPath)
	if s.cfg.DebugScanLimit {
		fmt.Printf("⚠️  DEBUG MODE: Only scanning first 20 files\n")
	}

	// First, collect all MP3 files
	var mp3Files []string
	err := filepath.Walk(udioPath, func(path string, info os.FileInfo, err error) error {
		if err != nil {
			return err
		}
		if !info.IsDir() && strings.HasSuffix(path, ".mp3") {
			mp3Files = append(mp3Files, path)
			// Apply debug limit if set
			if s.cfg.DebugScanLimit && len(mp3Files) >= 20 {
				return filepath.SkipAll // Stop walking
			}
		}
		return nil
	})

	if err != nil && err != filepath.SkipAll {
		return nil, fmt.Errorf("failed to walk udio directory: %w", err)
	}

	fmt.Printf("  📊 Found %d MP3 files to process\n", len(mp3Files))

	// Pattern: Scan concurrently, write sequentially (same as Suno)
	const numWorkers = 10
	jobs := make(chan string, len(mp3Files))
	tracksToCreate := make(chan trackToCreate, 100)
	var wg sync.WaitGroup
	var mu sync.Mutex

	// Start scanner workers
	for w := 0; w < numWorkers; w++ {
		wg.Add(1)
		go func() {
			defer wg.Done()
			for path := range jobs {
				mu.Lock()
				result.TotalFound++
				mu.Unlock()

				// Check if track already exists (read - safe concurrently)
				_, err := s.querier.GetTrackByFilePath(ctx, path)
				if err == nil {
					mu.Lock()
					result.ExistingTracks++
					mu.Unlock()
					continue
				}
				if err != sql.ErrNoRows {
					mu.Lock()
					result.Errors = append(result.Errors, fmt.Sprintf("error checking %s: %v", path, err))
					mu.Unlock()
					continue
				}

				// Extract metadata from path and filename
				filename := filepath.Base(path)

				// Try to extract Udio ID from filename
				udioID := ""
				if idx := strings.Index(filename, "-"); idx > 0 {
					udioID = filename[:idx]
				}

				// Extract MP3 duration
				durationMs, err := getMp3Duration(path)
				if err != nil {
					// Don't spam logs for Udio, just skip duration
					durationMs = 0
				}

				// Prepare track data (no write yet)
				trackID := generateID()

				// Send to sequential writer
				tracksToCreate <- trackToCreate{
					params: db.CreateTrackParams{
						ID:         trackID,
						SongID:     sql.NullString{Valid: false},
						SourceType: "udio",
						FilePath:   path,
						SunoID:     sql.NullString{Valid: false},
						UdioID:     sql.NullString{String: udioID, Valid: udioID != ""},
						ImagePath:  sql.NullString{Valid: false},
						Title:      cleanFilename(filename),
						DurationMs: sql.NullInt64{Int64: durationMs, Valid: durationMs > 0},
						StyleDesc:  sql.NullString{Valid: false}, // Udio doesn't have style desc
						Rating:     sql.NullInt64{Valid: false},
						IsTrash:    false,
						IsDeleted:  false,
						ArtistTags: sql.NullString{String: "[]", Valid: true},
						AlbumTags:  sql.NullString{String: "[]", Valid: true},
						GenreTags:  sql.NullString{String: "[]", Valid: true},
						MoodTags:   sql.NullString{String: "[]", Valid: true},
						Tags:       sql.NullString{String: "[]", Valid: true},
						Metadata:   sql.NullString{String: "{}", Valid: true},
					},
					filename: filename,
				}
			}
		}()
	}

	// Single sequential writer goroutine
	writerDone := make(chan struct{})
	go func() {
		defer close(writerDone)
		for track := range tracksToCreate {
			_, err := s.querier.CreateTrack(ctx, track.params)
			if err != nil {
				mu.Lock()
				result.Errors = append(result.Errors, fmt.Sprintf("failed to create track %s: %v", track.filename, err))
				mu.Unlock()
			} else {
				mu.Lock()
				result.NewTracks++
				mu.Unlock()
			}
		}
	}()

	// Send jobs to scanner workers
	for _, path := range mp3Files {
		jobs <- path
	}
	close(jobs)

	// Wait for all scanners to finish
	wg.Wait()

	// Close tracks channel and wait for writer to finish
	close(tracksToCreate)
	<-writerDone

	fmt.Printf("✅ Udio scan complete: %d found, %d new, %d existing, %d errors\n",
		result.TotalFound, result.NewTracks, result.ExistingTracks, len(result.Errors))

	return result, nil
}

// Helper functions

func generateID() string {
	b := make([]byte, 16)
	rand.Read(b)
	return hex.EncodeToString(b)
}

func cleanFilename(filename string) string {
	// Remove extension
	name := strings.TrimSuffix(filename, filepath.Ext(filename))

	// Remove UUID prefix if present (format: UUID-title)
	if idx := strings.Index(name, "-"); idx > 0 {
		name = name[idx+1:]
	}

	// Remove quality notes (e.g., "--okayish")
	if idx := strings.Index(name, "--"); idx > 0 {
		name = name[:idx]
	}

	// Clean up dashes and spaces
	name = strings.ReplaceAll(name, "-", " ")
	name = strings.TrimSpace(name)

	return name
}

// DropDatabase drops all tracks and related data from the database
func (s *ScannerService) DropDatabase(ctx context.Context) error {
	fmt.Printf("⚠️  Dropping all tracks from database...\n")

	// Delete all tracks (cascades to track_comments and collection_tracks)
	err := s.querier.DeleteAllTracks(ctx)
	if err != nil {
		return fmt.Errorf("failed to delete tracks: %w", err)
	}

	fmt.Printf("✅ Database dropped successfully\n")
	return nil
}
