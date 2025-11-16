package services

import (
	"context"
	"database/sql"
	"encoding/json"
	"fmt"
	"dam-backend/internal/db"
)

type ProjectService struct {
	querier db.Querier
}

func NewProjectService(querier db.Querier) *ProjectService {
	return &ProjectService{querier: querier}
}

// CreateProjectInput represents input for creating a project
type CreateProjectInput struct {
	Name         string   `json:"name"`
	Description  string   `json:"description"`
	CollectionID string   `json:"collection_id"`
	Tags         []string `json:"tags"`
	State        string   `json:"state"`
	Mood         string   `json:"mood"`
}

func (s *ProjectService) CreateProject(ctx context.Context, input CreateProjectInput) (*db.Project, error) {
	tagsJSON, _ := json.Marshal(input.Tags)

	id := generateID()
	state := input.State
	if state == "" {
		state = "active"
	}

	project, err := s.querier.CreateProject(ctx, db.CreateProjectParams{
		ID:           id,
		Name:         input.Name,
		Description:  sql.NullString{String: input.Description, Valid: input.Description != ""},
		CollectionID: sql.NullString{String: input.CollectionID, Valid: input.CollectionID != ""},
		Tags:         sql.NullString{String: string(tagsJSON), Valid: true},
		State:        state,
		Mood:         sql.NullString{String: input.Mood, Valid: input.Mood != ""},
	})

	if err != nil {
		return nil, fmt.Errorf("failed to create project: %w", err)
	}

	return &project, nil
}

func (s *ProjectService) GetProject(ctx context.Context, id string) (*db.Project, error) {
	project, err := s.querier.GetProject(ctx, id)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, fmt.Errorf("project not found")
		}
		return nil, fmt.Errorf("failed to get project: %w", err)
	}
	return &project, nil
}

func (s *ProjectService) ListProjects(ctx context.Context) ([]db.Project, error) {
	return s.querier.ListProjects(ctx)
}

func (s *ProjectService) ListProjectsByCollection(ctx context.Context, collectionID string) ([]db.Project, error) {
	return s.querier.ListProjectsByCollection(ctx, sql.NullString{String: collectionID, Valid: true})
}

// UpdateProjectInput represents input for updating a project
type UpdateProjectInput struct {
	Name         *string   `json:"name"`
	Description  *string   `json:"description"`
	CollectionID *string   `json:"collection_id"`
	Tags         *[]string `json:"tags"`
	State        *string   `json:"state"`
	Mood         *string   `json:"mood"`
}

func (s *ProjectService) UpdateProject(ctx context.Context, id string, input UpdateProjectInput) (*db.Project, error) {
	params := db.UpdateProjectParams{
		ID: id,
	}

	if input.Name != nil {
		params.Name = sql.NullString{String: *input.Name, Valid: true}
	}
	if input.Description != nil {
		params.Description = sql.NullString{String: *input.Description, Valid: true}
	}
	if input.CollectionID != nil {
		params.CollectionID = sql.NullString{String: *input.CollectionID, Valid: true}
	}
	if input.Tags != nil {
		tagsJSON, _ := json.Marshal(*input.Tags)
		params.Tags = sql.NullString{String: string(tagsJSON), Valid: true}
	}
	if input.State != nil {
		params.State = sql.NullString{String: *input.State, Valid: true}
	}
	if input.Mood != nil {
		params.Mood = sql.NullString{String: *input.Mood, Valid: true}
	}

	project, err := s.querier.UpdateProject(ctx, params)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, fmt.Errorf("project not found")
		}
		return nil, fmt.Errorf("failed to update project: %w", err)
	}

	return &project, nil
}

func (s *ProjectService) DeleteProject(ctx context.Context, id string) error {
	return s.querier.DeleteProject(ctx, id)
}
