package api

import (
	"dam-backend/internal/db"
	"database/sql"
	"encoding/json"
	"time"
)

// TrackResponse is the API representation of a track (no sql.Null* types exposed)
type TrackResponse struct {
	ID         string    `json:"id"`
	SongID     *string   `json:"song_id,omitempty"`
	SourceType string    `json:"source_type"`
	FilePath   string    `json:"file_path"`
	SunoID     *string   `json:"suno_id,omitempty"`
	UdioID     *string   `json:"udio_id,omitempty"`
	ImagePath  *string   `json:"image_path,omitempty"`
	Title      string    `json:"title"`
	DurationMs *int64    `json:"duration_ms,omitempty"`
	StyleDesc  *string   `json:"style_desc,omitempty"`
	Rating     *int      `json:"rating,omitempty"`
	IsTrash    bool      `json:"is_trash"`
	IsDeleted  bool      `json:"is_deleted"`
	ArtistTags []string  `json:"artist_tags"`
	AlbumTags  []string  `json:"album_tags"`
	GenreTags  []string  `json:"genre_tags"`
	MoodTags   []string  `json:"mood_tags"`
	Tags       []string  `json:"tags"`
	Metadata   string    `json:"metadata"`
	CreatedAt  time.Time `json:"created_at"`
	UpdatedAt  time.Time `json:"updated_at"`
}

// ToTrackResponse converts a db.Track to TrackResponse (clean API response)
func ToTrackResponse(t db.Track) TrackResponse {
	resp := TrackResponse{
		ID:         t.ID,
		SourceType: t.SourceType,
		FilePath:   t.FilePath,
		Title:      t.Title,
		IsTrash:    t.IsTrash,
		IsDeleted:  t.IsDeleted,
		CreatedAt:  t.CreatedAt,
		UpdatedAt:  t.UpdatedAt,
	}

	// Convert sql.NullString to *string
	if t.SongID.Valid {
		resp.SongID = &t.SongID.String
	}
	if t.SunoID.Valid {
		resp.SunoID = &t.SunoID.String
	}
	if t.UdioID.Valid {
		resp.UdioID = &t.UdioID.String
	}
	if t.ImagePath.Valid {
		resp.ImagePath = &t.ImagePath.String
	}
	if t.Metadata.Valid {
		resp.Metadata = t.Metadata.String
	} else {
		resp.Metadata = "{}"
	}

	// Convert sql.NullInt64 to *int or *int64
	if t.DurationMs.Valid {
		resp.DurationMs = &t.DurationMs.Int64
	}
	if t.StyleDesc.Valid {
		resp.StyleDesc = &t.StyleDesc.String
	}
	if t.Rating.Valid {
		rating := int(t.Rating.Int64)
		resp.Rating = &rating
	}

	// Parse JSON arrays or default to empty arrays
	resp.ArtistTags = parseJSONArray(t.ArtistTags)
	resp.AlbumTags = parseJSONArray(t.AlbumTags)
	resp.GenreTags = parseJSONArray(t.GenreTags)
	resp.MoodTags = parseJSONArray(t.MoodTags)
	resp.Tags = parseJSONArray(t.Tags)

	return resp
}

// parseJSONArray safely parses a JSON array string or returns empty array
func parseJSONArray(ns sql.NullString) []string {
	if !ns.Valid || ns.String == "" {
		return []string{}
	}

	var tags []string
	if err := json.Unmarshal([]byte(ns.String), &tags); err != nil {
		// If parsing fails, return empty array
		return []string{}
	}

	return tags
}

// TrackCommentResponse is the API representation of a track comment
type TrackCommentResponse struct {
	TrackID   string    `json:"track_id"`
	General   *string   `json:"general,omitempty"`
	Pluses    *string   `json:"pluses,omitempty"`
	Minuses   *string   `json:"minuses,omitempty"`
	Blockers  *string   `json:"blockers,omitempty"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

// ToTrackCommentResponse converts a db.TrackComment to TrackCommentResponse
func ToTrackCommentResponse(c db.TrackComment) TrackCommentResponse {
	resp := TrackCommentResponse{
		TrackID:   c.TrackID,
		CreatedAt: c.CreatedAt,
		UpdatedAt: c.UpdatedAt,
	}

	if c.General.Valid && c.General.String != "" {
		resp.General = &c.General.String
	}
	if c.Pluses.Valid && c.Pluses.String != "" {
		resp.Pluses = &c.Pluses.String
	}
	if c.Minuses.Valid && c.Minuses.String != "" {
		resp.Minuses = &c.Minuses.String
	}
	if c.Blockers.Valid && c.Blockers.String != "" {
		resp.Blockers = &c.Blockers.String
	}

	return resp
}

// TrackWithCommentResponse is the API representation of a track with its comment
type TrackWithCommentResponse struct {
	Track   TrackResponse         `json:"track"`
	Comment *TrackCommentResponse `json:"comment,omitempty"`
}

// CollectionResponse is the API representation of a collection
type CollectionResponse struct {
	ID          string    `json:"id"`
	Name        string    `json:"name"`
	Description string    `json:"description,omitempty"`
	Tags        []string  `json:"tags"`
	State       string    `json:"state"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
}

// ToCollectionResponse converts a db.Collection to CollectionResponse
func ToCollectionResponse(c db.Collection) CollectionResponse {
	resp := CollectionResponse{
		ID:        c.ID,
		Name:      c.Name,
		State:     c.State,
		CreatedAt: c.CreatedAt,
		UpdatedAt: c.UpdatedAt,
		Tags:      parseJSONArray(c.Tags),
	}

	if c.Description.Valid {
		resp.Description = c.Description.String
	}

	return resp
}

// ProjectResponse is the API representation of a project
type ProjectResponse struct {
	ID           string    `json:"id"`
	Name         string    `json:"name"`
	Description  string    `json:"description,omitempty"`
	CollectionID string    `json:"collection_id"`
	Tags         []string  `json:"tags"`
	State        string    `json:"state"`
	Mood         string    `json:"mood,omitempty"`
	CreatedAt    time.Time `json:"created_at"`
	UpdatedAt    time.Time `json:"updated_at"`
}

// ToProjectResponse converts a db.Project to ProjectResponse
func ToProjectResponse(p db.Project) ProjectResponse {
	resp := ProjectResponse{
		ID:        p.ID,
		Name:      p.Name,
		State:     p.State,
		CreatedAt: p.CreatedAt,
		UpdatedAt: p.UpdatedAt,
		Tags:      parseJSONArray(p.Tags),
	}

	if p.Description.Valid {
		resp.Description = p.Description.String
	}
	if p.CollectionID.Valid {
		resp.CollectionID = p.CollectionID.String
	}
	if p.Mood.Valid {
		resp.Mood = p.Mood.String
	}

	return resp
}

// IdeaResponse is the API representation of an idea
type IdeaResponse struct {
	ID             string    `json:"id"`
	Name           string    `json:"name"`
	ProjectID      string    `json:"project_id"`
	Description    string    `json:"description,omitempty"`
	Tags           []string  `json:"tags"`
	State          string    `json:"state"`
	ReferenceNotes string    `json:"reference_notes,omitempty"`
	CreatedAt      time.Time `json:"created_at"`
	UpdatedAt      time.Time `json:"updated_at"`
}

// ToIdeaResponse converts a db.Idea to IdeaResponse
func ToIdeaResponse(i db.Idea) IdeaResponse {
	resp := IdeaResponse{
		ID:        i.ID,
		Name:      i.Name,
		ProjectID: i.ProjectID,
		State:     i.State,
		CreatedAt: i.CreatedAt,
		UpdatedAt: i.UpdatedAt,
		Tags:      parseJSONArray(i.Tags),
	}

	if i.Description.Valid {
		resp.Description = i.Description.String
	}
	if i.ReferenceNotes.Valid {
		resp.ReferenceNotes = i.ReferenceNotes.String
	}

	return resp
}

// SongResponse is the API representation of a song
type SongResponse struct {
	ID          string    `json:"id"`
	Name        string    `json:"name"`
	IdeaID      string    `json:"idea_id"`
	Description string    `json:"description,omitempty"`
	Tags        []string  `json:"tags"`
	State       string    `json:"state"`
	Version     string    `json:"version,omitempty"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
}

// ToSongResponse converts a db.Song to SongResponse
func ToSongResponse(s db.Song) SongResponse {
	resp := SongResponse{
		ID:        s.ID,
		Name:      s.Name,
		IdeaID:    s.IdeaID,
		State:     s.State,
		CreatedAt: s.CreatedAt,
		UpdatedAt: s.UpdatedAt,
		Tags:      parseJSONArray(s.Tags),
	}

	if s.Description.Valid {
		resp.Description = s.Description.String
	}
	if s.Version.Valid {
		resp.Version = s.Version.String
	}

	return resp
}
