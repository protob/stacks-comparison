package models

import "time"

// TrackExtras defines the structure of the JSON object stored in Track.Extras.
type TrackExtras struct {
	Lyrics *struct {
		Original   string  `json:"original"`
		Translated *string `json:"translated,omitempty"`
	} `json:"lyrics,omitempty"`
}

// Track represents the track metadata for API responses.
type Track struct {
	ID              string       `json:"id"`
	AlbumID         string       `json:"albumId"`
	TrackNumber     int          `json:"trackNumber"`
	Title           string       `json:"title"`
	DurationMs      *int         `json:"durationMs,omitempty"`
	AudioStorageKey *string      `json:"audioStorageKey,omitempty"`
	Extras          *TrackExtras `json:"extras,omitempty"`
	Album           *Album       `json:"album,omitempty"` // Nested album info
}

// Album represents the album metadata for API responses, including its tracks.
type Album struct {
	ID                string    `json:"id"`
	Slug              string    `json:"slug"`
	Title             string    `json:"title"`
	ArtistID          string    `json:"artistId"`
	AlbumType         string    `json:"albumType"`
	State             string    `json:"state"`
	ImageStorageKey   *string   `json:"imageStorageKey,omitempty"`
	ArtistNameDisplay *string   `json:"artistNameDisplay,omitempty"`
	CreatedAt         time.Time `json:"createdAt"`
	UpdatedAt         time.Time `json:"updatedAt"`
	Tracks            []Track   `json:"tracks"` // Nested tracks
}

// Artist represents the artist metadata for API responses.
type Artist struct {
	ID              string    `json:"id"`
	Name            string    `json:"name"`
	State           string    `json:"state"`
	About           *string   `json:"about,omitempty"`
	Tags            []string  `json:"tags,omitempty"`
	ImageStorageKey *string   `json:"imageStorageKey,omitempty"`
	CreatedAt       time.Time `json:"createdAt"`
	UpdatedAt       time.Time `json:"updatedAt"`
}

// Playlist represents the playlist metadata for API responses.
type Playlist struct {
	ID              string    `json:"id"`
	Name            string    `json:"name"`
	Description     *string   `json:"description,omitempty"`
	ImageStorageKey *string   `json:"imageStorageKey,omitempty"`
	State           string    `json:"state"`
	CreatedAt       time.Time `json:"createdAt"`
	UpdatedAt       time.Time `json:"updatedAt"`
}

// PlaylistWithTracks represents a playlist with its tracks.
type PlaylistWithTracks struct {
	Playlist
	Tracks []PlaylistTrack `json:"tracks"`
}

// PlaylistTrack represents a track in a playlist with full track info.
type PlaylistTrack struct {
	ID       string    `json:"id"`
	TrackID  string    `json:"trackId"`
	Position int       `json:"position"`
	AddedAt  time.Time `json:"addedAt"`
	Track    Track     `json:"track"` // Nested track info
}
