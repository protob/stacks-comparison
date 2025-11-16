package services

import (
	"context"
	"database/sql"
	"encoding/json"
	"fmt"
	"dam-backend/internal/db"
)

type CollectionService struct {
	querier db.Querier
}

func NewCollectionService(querier db.Querier) *CollectionService {
	return &CollectionService{querier: querier}
}

// CreateCollectionInput represents input for creating a collection
type CreateCollectionInput struct {
	Name        string   `json:"name"`
	Description string   `json:"description"`
	Tags        []string `json:"tags"`
	State       string   `json:"state"`
}

func (s *CollectionService) CreateCollection(ctx context.Context, input CreateCollectionInput) (*db.Collection, error) {
	tagsJSON, _ := json.Marshal(input.Tags)

	id := generateID()
	state := input.State
	if state == "" {
		state = "active"
	}

	collection, err := s.querier.CreateCollection(ctx, db.CreateCollectionParams{
		ID:          id,
		Name:        input.Name,
		Description: sql.NullString{String: input.Description, Valid: input.Description != ""},
		Tags:        sql.NullString{String: string(tagsJSON), Valid: true},
		State:       state,
	})

	if err != nil {
		return nil, fmt.Errorf("failed to create collection: %w", err)
	}

	return &collection, nil
}

func (s *CollectionService) GetCollection(ctx context.Context, id string) (*db.Collection, error) {
	collection, err := s.querier.GetCollection(ctx, id)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, fmt.Errorf("collection not found")
		}
		return nil, fmt.Errorf("failed to get collection: %w", err)
	}
	return &collection, nil
}

func (s *CollectionService) ListCollections(ctx context.Context) ([]db.Collection, error) {
	collections, err := s.querier.ListCollections(ctx)
	if err != nil {
		return nil, err
	}
	// Ensure we always return an empty slice instead of nil
	if collections == nil {
		return []db.Collection{}, nil
	}
	return collections, nil
}

func (s *CollectionService) AddTrackToCollection(ctx context.Context, collectionID, trackID string) error {
	id := generateID()
	_, err := s.querier.AddTrackToCollection(ctx, db.AddTrackToCollectionParams{
		ID:           id,
		CollectionID: collectionID,
		TrackID:      trackID,
	})
	return err
}

func (s *CollectionService) RemoveTrackFromCollection(ctx context.Context, collectionID, trackID string) error {
	return s.querier.RemoveTrackFromCollection(ctx, db.RemoveTrackFromCollectionParams{
		CollectionID: collectionID,
		TrackID:      trackID,
	})
}

func (s *CollectionService) GetCollectionTracks(ctx context.Context, collectionID string) ([]db.Track, error) {
	return s.querier.GetCollectionTracks(ctx, collectionID)
}

// UpdateCollectionInput represents input for updating a collection
type UpdateCollectionInput struct {
	Name        *string   `json:"name"`
	Description *string   `json:"description"`
	Tags        *[]string `json:"tags"`
	State       *string   `json:"state"`
}

func (s *CollectionService) UpdateCollection(ctx context.Context, id string, input UpdateCollectionInput) (*db.Collection, error) {
	params := db.UpdateCollectionParams{
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

	collection, err := s.querier.UpdateCollection(ctx, params)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, fmt.Errorf("collection not found")
		}
		return nil, fmt.Errorf("failed to update collection: %w", err)
	}

	return &collection, nil
}

func (s *CollectionService) DeleteCollection(ctx context.Context, id string) error {
	return s.querier.DeleteCollection(ctx, id)
}

// EnsureDefaultCollection creates a "default" collection if it doesn't exist
func (s *CollectionService) EnsureDefaultCollection(ctx context.Context) (*db.Collection, error) {
	// Try to find an existing default collection by name
	collections, err := s.querier.ListCollections(ctx)
	if err != nil {
		return nil, fmt.Errorf("failed to list collections: %w", err)
	}

	// Check if "Default" collection already exists
	for _, coll := range collections {
		if coll.Name == "Default" {
			return &coll, nil
		}
	}

	// Create default collection if it doesn't exist
	tagsJSON, _ := json.Marshal([]string{})
	id := generateID()

	collection, err := s.querier.CreateCollection(ctx, db.CreateCollectionParams{
		ID:          id,
		Name:        "Default",
		Description: sql.NullString{String: "Default collection for uncategorized projects", Valid: true},
		Tags:        sql.NullString{String: string(tagsJSON), Valid: true},
		State:       "active",
	})

	if err != nil {
		return nil, fmt.Errorf("failed to create default collection: %w", err)
	}

	return &collection, nil
}
