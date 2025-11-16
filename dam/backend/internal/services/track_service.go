package services

import (
	"context"
	"dam-backend/internal/config"
	"dam-backend/internal/db"
	"database/sql"
	"encoding/json"
	"fmt"
	"os"
	"path/filepath"
)

type TrackService struct {
	cfg     *config.Config
	querier db.Querier
}

func NewTrackService(cfg *config.Config, querier db.Querier) *TrackService {
	return &TrackService{
		cfg:     cfg,
		querier: querier,
	}
}

type UpdateTrackInput struct {
	Title      *string   `json:"title,omitempty"`
	Rating     *int      `json:"rating,omitempty"`
	IsTrash    *bool     `json:"is_trash,omitempty"`
	StyleDesc  *string   `json:"style_desc,omitempty"`
	ArtistTags *[]string `json:"artist_tags,omitempty"`
	AlbumTags  *[]string `json:"album_tags,omitempty"`
	GenreTags  *[]string `json:"genre_tags,omitempty"`
	MoodTags   *[]string `json:"mood_tags,omitempty"`
	Tags       *[]string `json:"tags,omitempty"`
}

type TrackCommentInput struct {
	General  string `json:"general"`
	Pluses   string `json:"pluses"`
	Minuses  string `json:"minuses"`
	Blockers string `json:"blockers"`
}

type TrackWithComment struct {
	Track   *db.Track        `json:"track"`
	Comment *db.TrackComment `json:"comment,omitempty"`
}

func (s *TrackService) GetTrack(ctx context.Context, id string) (*db.Track, error) {
	track, err := s.querier.GetTrack(ctx, id)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, fmt.Errorf("track not found")
		}
		return nil, fmt.Errorf("failed to get track: %w", err)
	}
	return &track, nil
}

func (s *TrackService) GetTrackWithCollections(ctx context.Context, id string) (map[string]interface{}, error) {
	track, err := s.GetTrack(ctx, id)
	if err != nil {
		return nil, err
	}

	// Get collections this track belongs to
	collections, err := s.querier.GetTrackCollections(ctx, id)
	if err != nil {
		return nil, fmt.Errorf("failed to get track collections: %w", err)
	}

	// Check if in any collection
	inAnyCollection, err := s.querier.IsTrackInAnyCollection(ctx, id)
	if err != nil {
		return nil, fmt.Errorf("failed to check collection status: %w", err)
	}

	return map[string]interface{}{
		"track":             track,
		"collections":       collections,
		"in_any_collection": inAnyCollection,
	}, nil
}

func (s *TrackService) UpdateTrack(ctx context.Context, id string, input UpdateTrackInput) (*db.Track, error) {
	params := db.UpdateTrackParams{
		ID: id,
	}

	if input.Title != nil {
		params.Title = sql.NullString{String: *input.Title, Valid: true}
	}

	if input.Rating != nil {
		params.Rating = sql.NullInt64{Int64: int64(*input.Rating), Valid: true}
	}

	if input.IsTrash != nil {
		params.IsTrash = sql.NullBool{Bool: *input.IsTrash, Valid: true}
	}

	if input.ArtistTags != nil {
		tagsJSON, _ := json.Marshal(input.ArtistTags)
		params.ArtistTags = sql.NullString{String: string(tagsJSON), Valid: true}
	}

	if input.AlbumTags != nil {
		tagsJSON, _ := json.Marshal(input.AlbumTags)
		params.AlbumTags = sql.NullString{String: string(tagsJSON), Valid: true}
	}

	if input.GenreTags != nil {
		tagsJSON, _ := json.Marshal(input.GenreTags)
		params.GenreTags = sql.NullString{String: string(tagsJSON), Valid: true}
	}

	if input.MoodTags != nil {
		tagsJSON, _ := json.Marshal(input.MoodTags)
		params.MoodTags = sql.NullString{String: string(tagsJSON), Valid: true}
	}

	if input.Tags != nil {
		tagsJSON, _ := json.Marshal(input.Tags)
		params.Tags = sql.NullString{String: string(tagsJSON), Valid: true}
	}

	if input.StyleDesc != nil {
		params.StyleDesc = sql.NullString{String: *input.StyleDesc, Valid: true}
	}

	track, err := s.querier.UpdateTrack(ctx, params)
	if err != nil {
		return nil, fmt.Errorf("failed to update track: %w", err)
	}

	return &track, nil
}

func (s *TrackService) UpdateTrackRating(ctx context.Context, id string, rating int) (*db.Track, error) {
	if rating < 1 || rating > 5 {
		return nil, fmt.Errorf("rating must be between 1 and 5")
	}

	track, err := s.querier.UpdateTrackRating(ctx, db.UpdateTrackRatingParams{
		Rating: sql.NullInt64{Int64: int64(rating), Valid: true},
		ID:     id,
	})

	if err != nil {
		return nil, fmt.Errorf("failed to update rating: %w", err)
	}

	return &track, nil
}

func (s *TrackService) DeleteTrack(ctx context.Context, id string, hardDelete bool) error {
	track, err := s.GetTrack(ctx, id)
	if err != nil {
		return err
	}

	if hardDelete {
		// Delete file from disk
		if err := os.Remove(track.FilePath); err != nil && !os.IsNotExist(err) {
			return fmt.Errorf("failed to delete file: %w", err)
		}

		// Delete image if Suno
		if track.ImagePath.Valid && track.ImagePath.String != "" {
			os.Remove(track.ImagePath.String) // Ignore error
		}

		// Delete from database
		return s.querier.DeleteTrack(ctx, id)
	}

	// Soft delete: move to trash
	trashDir := filepath.Join(s.cfg.AssetsPath, "trash", track.SourceType)
	if err := os.MkdirAll(trashDir, 0755); err != nil {
		return fmt.Errorf("failed to create trash directory: %w", err)
	}

	// Move file
	filename := filepath.Base(track.FilePath)
	trashPath := filepath.Join(trashDir, filename)
	if err := os.Rename(track.FilePath, trashPath); err != nil {
		return fmt.Errorf("failed to move file to trash: %w", err)
	}

	// Move image if Suno
	if track.ImagePath.Valid && track.ImagePath.String != "" {
		imageFilename := filepath.Base(track.ImagePath.String)
		imageTrashPath := filepath.Join(trashDir, imageFilename)
		os.Rename(track.ImagePath.String, imageTrashPath) // Ignore error
	}

	// Mark as deleted in database
	return s.querier.SoftDeleteTrack(ctx, id)
}

// --- CORRECTED Workspace Queries ---

// ListSunoFolder now correctly targets the 'mp3' subfolder.
func (s *TrackService) ListSunoFolder(ctx context.Context, folderName string) ([]db.Track, error) {
	// The path from the URL is just "1", "2", etc. We construct the full path to the mp3s.
	pattern := filepath.Join(s.cfg.AssetsPath, "suno", "output", folderName, "mp3") + string(filepath.Separator) + "%"
	return s.querier.ListSunoTracksInFolder(ctx, pattern)
}

// ListUdioPath now correctly handles paths with spaces.
func (s *TrackService) ListUdioPath(ctx context.Context, relativePath string) ([]db.Track, error) {
	// The path from the URL is already decoded. We build the full filesystem path for the LIKE query.
	pattern := filepath.Join(s.cfg.AssetsPath, "udio", "sorted", relativePath) + string(filepath.Separator) + "%"
	return s.querier.ListUdioTracksInPath(ctx, pattern)
}

// ListTracks lists all tracks (not deleted)
func (s *TrackService) ListTracks(ctx context.Context) ([]db.Track, error) {
	return s.querier.ListTracks(ctx)
}

// ListTracksBySong lists all tracks for a given song
func (s *TrackService) ListTracksBySong(ctx context.Context, songID string) ([]db.Track, error) {
	return s.querier.ListTracksBySong(ctx, sql.NullString{String: songID, Valid: true})
}

// GetTrackWithComment gets a track along with its comment (if exists)
func (s *TrackService) GetTrackWithComment(ctx context.Context, id string) (*TrackWithComment, error) {
	track, err := s.GetTrack(ctx, id)
	if err != nil {
		return nil, err
	}

	// Try to get comment - it might not exist
	comment, err := s.querier.GetTrackComment(ctx, id)
	if err != nil && err != sql.ErrNoRows {
		return nil, fmt.Errorf("failed to get track comment: %w", err)
	}

	result := &TrackWithComment{Track: track}
	if err != sql.ErrNoRows {
		result.Comment = &comment
	}

	return result, nil
}

// UpsertTrackComment creates or updates a track comment
func (s *TrackService) UpsertTrackComment(ctx context.Context, trackID string, input TrackCommentInput) (*db.TrackComment, error) {
	comment, err := s.querier.UpsertTrackComment(ctx, db.UpsertTrackCommentParams{
		TrackID:  trackID,
		General:  sql.NullString{String: input.General, Valid: true},
		Pluses:   sql.NullString{String: input.Pluses, Valid: true},
		Minuses:  sql.NullString{String: input.Minuses, Valid: true},
		Blockers: sql.NullString{String: input.Blockers, Valid: true},
	})

	if err != nil {
		return nil, fmt.Errorf("failed to upsert track comment: %w", err)
	}

	return &comment, nil
}

// AssignTrackToSong assigns a track to a song (or unassigns if songID is nil)
func (s *TrackService) AssignTrackToSong(ctx context.Context, trackID string, songID *string) (*db.Track, error) {
	var songIDParam sql.NullString
	if songID != nil && *songID != "" {
		songIDParam = sql.NullString{String: *songID, Valid: true}
	}

	track, err := s.querier.UpdateTrackSong(ctx, db.UpdateTrackSongParams{
		SongID: songIDParam,
		ID:     trackID,
	})

	if err != nil {
		return nil, fmt.Errorf("failed to assign track to song: %w", err)
	}

	return &track, nil
}

// BulkAssignTracksToSong assigns multiple tracks to a song
func (s *TrackService) BulkAssignTracksToSong(ctx context.Context, trackIDs []string, songID *string) error {
	if len(trackIDs) == 0 {
		return fmt.Errorf("no tracks provided")
	}

	var songIDParam sql.NullString
	if songID != nil && *songID != "" {
		songIDParam = sql.NullString{String: *songID, Valid: true}
	}

	err := s.querier.BulkUpdateTracksSong(ctx, db.BulkUpdateTracksSongParams{
		SongID: songIDParam,
		Ids:    trackIDs,
	})

	if err != nil {
		return fmt.Errorf("failed to bulk assign tracks: %w", err)
	}

	return nil
}
