-- DAM (Digital Audio Manager) Database Schema
-- Phase 1: Core tables for workspace and library

-- =============================================================================
-- LIBRARY (Curated Organization)
-- =============================================================================

-- Collections: Top-level groupings
CREATE TABLE IF NOT EXISTS collections (
    id                TEXT PRIMARY KEY,
    name              TEXT NOT NULL,
    description       TEXT,
    tags              TEXT, -- JSON array: ["tag1", "tag2"]
    state             TEXT NOT NULL DEFAULT 'active',
    created_at        TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at        TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Projects: Thematic collections (belong to a collection)
CREATE TABLE IF NOT EXISTS projects (
    id                TEXT PRIMARY KEY,
    name              TEXT NOT NULL,
    description       TEXT,
    collection_id     TEXT, -- Optional parent collection
    tags              TEXT, -- JSON array
    state             TEXT NOT NULL DEFAULT 'active',
    mood              TEXT, -- Optional: "dark", "uplifting", etc.
    created_at        TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at        TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (collection_id) REFERENCES collections(id) ON DELETE SET NULL
);

-- Ideas: Song concepts (belong to a project)
CREATE TABLE IF NOT EXISTS ideas (
    id                TEXT PRIMARY KEY,
    name              TEXT NOT NULL,
    project_id        TEXT NOT NULL,
    description       TEXT,
    tags              TEXT, -- JSON array
    state             TEXT NOT NULL DEFAULT 'concept',
    reference_notes   TEXT, -- Markdown or plain text
    created_at        TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at        TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);

-- Songs: Specific implementations of ideas (belong to an idea)
CREATE TABLE IF NOT EXISTS songs (
    id                TEXT PRIMARY KEY,
    name              TEXT NOT NULL,
    idea_id           TEXT NOT NULL,
    description       TEXT,
    tags              TEXT, -- JSON array
    state             TEXT NOT NULL DEFAULT 'draft',
    version           TEXT, -- "v1", "remix", "extended", etc.
    created_at        TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at        TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (idea_id) REFERENCES ideas(id) ON DELETE CASCADE
);

-- =============================================================================
-- TRACKS (Core Entity - appears in both Workspace and Library)
-- =============================================================================

CREATE TABLE IF NOT EXISTS tracks (
    id                TEXT PRIMARY KEY,
    song_id           TEXT, -- NULL if not assigned to any song yet (workspace-only track)

    -- Source information
    source_type       TEXT NOT NULL, -- "suno" or "udio"
    file_path         TEXT NOT NULL UNIQUE, -- Absolute path to MP3 in /dam-assets

    -- Source-specific IDs (for mapping back to original)
    suno_id           TEXT, -- UUID from filename (e.g., "14b40934-...")
    udio_id           TEXT, -- UUID from filename

    -- Suno-specific
    image_path        TEXT, -- Path to AI-generated image (Suno only)

    -- Basic metadata
    title             TEXT NOT NULL,
    duration_ms       INTEGER,
    style_desc        TEXT, -- AI generation prompt/style description (from Suno tags field)

    -- Review/organization
    rating            INTEGER, -- 1-5 stars
    is_trash          BOOLEAN NOT NULL DEFAULT 0,
    is_deleted        BOOLEAN NOT NULL DEFAULT 0, -- Soft delete flag

    -- Separate tag taxonomies (all optional, JSON arrays)
    artist_tags       TEXT, -- JSON: ["ATT", "Synthwave Project"]
    album_tags        TEXT, -- JSON: ["Metropolis Noir Collection"]
    genre_tags        TEXT, -- JSON: ["darkwave", "ebm", "industrial"]
    mood_tags         TEXT, -- JSON: ["melancholic", "cinematic", "atmospheric"]
    tags              TEXT, -- JSON: ["okayish", "needs-remix", "extend-in-suno"]

    -- Additional metadata (JSON blob for flexibility)
    metadata          TEXT, -- JSON: { "original_prompt": "...", "suno_style": "...", etc. }

    created_at        TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at        TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (song_id) REFERENCES songs(id) ON DELETE SET NULL
);

-- Indexes for tracks (critical for performance)
CREATE INDEX IF NOT EXISTS idx_tracks_source_type ON tracks(source_type);
CREATE INDEX IF NOT EXISTS idx_tracks_rating ON tracks(rating);
CREATE INDEX IF NOT EXISTS idx_tracks_is_trash ON tracks(is_trash);
CREATE INDEX IF NOT EXISTS idx_tracks_is_deleted ON tracks(is_deleted);
CREATE INDEX IF NOT EXISTS idx_tracks_suno_id ON tracks(suno_id);
CREATE INDEX IF NOT EXISTS idx_tracks_udio_id ON tracks(udio_id);
CREATE INDEX IF NOT EXISTS idx_tracks_song_id ON tracks(song_id);
CREATE INDEX IF NOT EXISTS idx_tracks_file_path ON tracks(file_path);

-- =============================================================================
-- TRACK COMMENTS (1:1 with tracks)
-- =============================================================================

CREATE TABLE IF NOT EXISTS track_comments (
    track_id          TEXT PRIMARY KEY,

    -- Four-field comment system
    general           TEXT, -- General observations
    pluses            TEXT, -- What's good
    minuses           TEXT, -- Minor issues (fixable)
    blockers          TEXT, -- Major issues (deal-breakers)

    created_at        TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at        TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (track_id) REFERENCES tracks(id) ON DELETE CASCADE
);

-- =============================================================================
-- WORKSPACE-LIBRARY LINKING (Many-to-Many)
-- =============================================================================

-- Tracks which collections a track belongs to
-- CRITICAL: This enables workspace to show visual indicators
CREATE TABLE IF NOT EXISTS collection_tracks (
    id              TEXT PRIMARY KEY,
    collection_id   TEXT NOT NULL,
    track_id        TEXT NOT NULL,
    added_at        TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (collection_id) REFERENCES collections(id) ON DELETE CASCADE,
    FOREIGN KEY (track_id) REFERENCES tracks(id) ON DELETE CASCADE,
    UNIQUE(collection_id, track_id)
);

CREATE INDEX IF NOT EXISTS idx_collection_tracks_collection ON collection_tracks(collection_id);
CREATE INDEX IF NOT EXISTS idx_collection_tracks_track ON collection_tracks(track_id);

-- =============================================================================
-- TRIGGERS (Auto-update timestamps)
-- =============================================================================

CREATE TRIGGER IF NOT EXISTS update_collections_updated_at
AFTER UPDATE ON collections
FOR EACH ROW
BEGIN
    UPDATE collections SET updated_at = CURRENT_TIMESTAMP WHERE id = OLD.id;
END;

CREATE TRIGGER IF NOT EXISTS update_projects_updated_at
AFTER UPDATE ON projects
FOR EACH ROW
BEGIN
    UPDATE projects SET updated_at = CURRENT_TIMESTAMP WHERE id = OLD.id;
END;

CREATE TRIGGER IF NOT EXISTS update_ideas_updated_at
AFTER UPDATE ON ideas
FOR EACH ROW
BEGIN
    UPDATE ideas SET updated_at = CURRENT_TIMESTAMP WHERE id = OLD.id;
END;

CREATE TRIGGER IF NOT EXISTS update_songs_updated_at
AFTER UPDATE ON songs
FOR EACH ROW
BEGIN
    UPDATE songs SET updated_at = CURRENT_TIMESTAMP WHERE id = OLD.id;
END;

CREATE TRIGGER IF NOT EXISTS update_tracks_updated_at
AFTER UPDATE ON tracks
FOR EACH ROW
BEGIN
    UPDATE tracks SET updated_at = CURRENT_TIMESTAMP WHERE id = OLD.id;
END;

CREATE TRIGGER IF NOT EXISTS update_track_comments_updated_at
AFTER UPDATE ON track_comments
FOR EACH ROW
BEGIN
    UPDATE track_comments SET updated_at = CURRENT_TIMESTAMP WHERE track_id = OLD.track_id;
END;
