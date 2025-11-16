package services

import (
	"context"
	"database/sql"
	"encoding/json"
	"fmt"
	"dam-backend/internal/db"
)

type IdeaService struct {
	querier db.Querier
}

func NewIdeaService(querier db.Querier) *IdeaService {
	return &IdeaService{querier: querier}
}

// CreateIdeaInput represents input for creating an idea
type CreateIdeaInput struct {
	Name           string   `json:"name"`
	ProjectID      string   `json:"project_id"`
	Description    string   `json:"description"`
	Tags           []string `json:"tags"`
	State          string   `json:"state"`
	ReferenceNotes string   `json:"reference_notes"`
}

func (s *IdeaService) CreateIdea(ctx context.Context, input CreateIdeaInput) (*db.Idea, error) {
	tagsJSON, _ := json.Marshal(input.Tags)

	id := generateID()
	state := input.State
	if state == "" {
		state = "active"
	}

	idea, err := s.querier.CreateIdea(ctx, db.CreateIdeaParams{
		ID:             id,
		Name:           input.Name,
		ProjectID:      input.ProjectID,
		Description:    sql.NullString{String: input.Description, Valid: input.Description != ""},
		Tags:           sql.NullString{String: string(tagsJSON), Valid: true},
		State:          state,
		ReferenceNotes: sql.NullString{String: input.ReferenceNotes, Valid: input.ReferenceNotes != ""},
	})

	if err != nil {
		return nil, fmt.Errorf("failed to create idea: %w", err)
	}

	return &idea, nil
}

func (s *IdeaService) GetIdea(ctx context.Context, id string) (*db.Idea, error) {
	idea, err := s.querier.GetIdea(ctx, id)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, fmt.Errorf("idea not found")
		}
		return nil, fmt.Errorf("failed to get idea: %w", err)
	}
	return &idea, nil
}

func (s *IdeaService) ListIdeas(ctx context.Context) ([]db.Idea, error) {
	return s.querier.ListIdeas(ctx)
}

func (s *IdeaService) ListIdeasByProject(ctx context.Context, projectID string) ([]db.Idea, error) {
	return s.querier.ListIdeasByProject(ctx, projectID)
}

// UpdateIdeaInput represents input for updating an idea
type UpdateIdeaInput struct {
	Name           *string   `json:"name"`
	Description    *string   `json:"description"`
	Tags           *[]string `json:"tags"`
	State          *string   `json:"state"`
	ReferenceNotes *string   `json:"reference_notes"`
}

func (s *IdeaService) UpdateIdea(ctx context.Context, id string, input UpdateIdeaInput) (*db.Idea, error) {
	params := db.UpdateIdeaParams{
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
	if input.ReferenceNotes != nil {
		params.ReferenceNotes = sql.NullString{String: *input.ReferenceNotes, Valid: true}
	}

	idea, err := s.querier.UpdateIdea(ctx, params)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, fmt.Errorf("idea not found")
		}
		return nil, fmt.Errorf("failed to update idea: %w", err)
	}

	return &idea, nil
}

func (s *IdeaService) DeleteIdea(ctx context.Context, id string) error {
	return s.querier.DeleteIdea(ctx, id)
}
