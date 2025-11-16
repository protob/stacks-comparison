package services

import (
	"context"
	"database/sql"
	"encoding/json"
	"fmt"
	"dam-backend/internal/db"
)

type SongService struct {
	querier db.Querier
}

func NewSongService(querier db.Querier) *SongService {
	return &SongService{querier: querier}
}

// CreateSongInput represents input for creating a song
type CreateSongInput struct {
	Name        string   `json:"name"`
	IdeaID      string   `json:"idea_id"`
	Description string   `json:"description"`
	Tags        []string `json:"tags"`
	State       string   `json:"state"`
	Version     string   `json:"version"`
}

func (s *SongService) CreateSong(ctx context.Context, input CreateSongInput) (*db.Song, error) {
	tagsJSON, _ := json.Marshal(input.Tags)

	id := generateID()
	state := input.State
	if state == "" {
		state = "active"
	}

	song, err := s.querier.CreateSong(ctx, db.CreateSongParams{
		ID:          id,
		Name:        input.Name,
		IdeaID:      input.IdeaID,
		Description: sql.NullString{String: input.Description, Valid: input.Description != ""},
		Tags:        sql.NullString{String: string(tagsJSON), Valid: true},
		State:       state,
		Version:     sql.NullString{String: input.Version, Valid: input.Version != ""},
	})

	if err != nil {
		return nil, fmt.Errorf("failed to create song: %w", err)
	}

	return &song, nil
}

func (s *SongService) GetSong(ctx context.Context, id string) (*db.Song, error) {
	song, err := s.querier.GetSong(ctx, id)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, fmt.Errorf("song not found")
		}
		return nil, fmt.Errorf("failed to get song: %w", err)
	}
	return &song, nil
}

func (s *SongService) ListSongs(ctx context.Context) ([]db.Song, error) {
	return s.querier.ListSongs(ctx)
}

func (s *SongService) ListSongsByIdea(ctx context.Context, ideaID string) ([]db.Song, error) {
	return s.querier.ListSongsByIdea(ctx, ideaID)
}

// UpdateSongInput represents input for updating a song
type UpdateSongInput struct {
	Name        *string   `json:"name"`
	Description *string   `json:"description"`
	Tags        *[]string `json:"tags"`
	State       *string   `json:"state"`
	Version     *string   `json:"version"`
}

func (s *SongService) UpdateSong(ctx context.Context, id string, input UpdateSongInput) (*db.Song, error) {
	params := db.UpdateSongParams{
		ID: id,
	}

	if input.Name != nil {
		params.Name = sql.NullString{String: *input.Name, Valid: true}
	}
	if input.Description != nil {
		params.Description = sql.NullString{String: *input.Description, Valid: true}
	}
	if input.Tags != nil {
		tagsJSON, _ := json.Marshal(*input.Tags)
		params.Tags = sql.NullString{String: string(tagsJSON), Valid: true}
	}
	if input.State != nil {
		params.State = sql.NullString{String: *input.State, Valid: true}
	}
	if input.Version != nil {
		params.Version = sql.NullString{String: *input.Version, Valid: true}
	}

	song, err := s.querier.UpdateSong(ctx, params)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, fmt.Errorf("song not found")
		}
		return nil, fmt.Errorf("failed to update song: %w", err)
	}

	return &song, nil
}

func (s *SongService) DeleteSong(ctx context.Context, id string) error {
	return s.querier.DeleteSong(ctx, id)
}
