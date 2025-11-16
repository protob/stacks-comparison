# DAM Backend - Technical Documentation

Go REST API server for Digital Audio Manager. Manages AI-generated music tracks (Suno/Udio) through a dual workspace/library system.

**Core Concept**: Workspace = raw file browsing. Library = curated organization hierarchy.

## Stack

- **Go 1.25**: Main language
- **Chi v5**: HTTP router (lightweight, fast)
- **Huma v2**: OpenAPI auto-generation
- **SQLite**: Embedded database (modernc.org/sqlite - pure Go)
- **sqlc**: Type-safe SQL code generation
- **UUID**: ID generation (github.com/google/uuid)

## Architecture Overview

### System Design

```
External File System              Backend Application              SQLite Database
┌──────────────┐                 ┌──────────────┐                ┌──────────────┐
│ /dam-assets/ │                 │              │                │              │
│  ├─ suno/    │──── Scanner ────▶│  Services   │────── sqlc ────▶│  Tables      │
│  └─ udio/    │                 │              │                │              │
└──────────────┘                 │  ┌────────┐  │                │  collections │
                                 │  │ Tracks │  │                │  projects    │
      HTTP ────────────────────▶ │  │ Library│  │                │  ideas       │
                                 │  │Workspace│  │                │  songs       │
                                 │  │ Scanner│  │                │  tracks      │
                                 │  └────────┘  │                │              │
                                 │      ▲       │                │              │
                                 │      │       │                │              │
                                 │  API Layer  │                │              │
                                 │  (handlers) │                │              │
                                 └──────────────┘                └──────────────┘
```

### Core Principle: Separation of Concerns

**File System** (`/dam-assets/`):
- NEVER modified by DAM
- Read-only source of truth for audio files
- Organized by AI platform (Suno folders, Udio paths)

**Database** (`data/dam.db`):
- Tracks metadata, ratings, comments, tags
- Library hierarchy (Collections → Projects → Ideas → Songs)
- Links between tracks and library entities
- NO audio file storage

**Serving** (`/files/*`):
- Static file server exposes `/dam-assets/` via HTTP
- Frontend requests files through `/files/suno/...` or `/files/udio/...`

## Database Schema

### Core Philosophy

The schema supports TWO independent views of the same track data:

1. **Workspace**: Browse ALL tracks by file system location
2. **Library**: Browse CURATED tracks by hierarchy

A track starts in Workspace (just a file). When assigned to a Song, it enters Library.

### Schema Diagram

```
LIBRARY HIERARCHY (Top-down organization)
┌─────────────┐
│ Collections │ (e.g., "Default", "Dark Ambient Collection")
└──────┬──────┘
       │ 1:N
┌──────▼──────┐
│  Projects   │ (e.g., "Cyberpunk City Themes")
└──────┬──────┘
       │ 1:N
┌──────▼──────┐
│    Ideas    │ (e.g., "Neon Rain Concept")
└──────┬──────┘
       │ 1:N
┌──────▼──────┐
│    Songs    │ (e.g., "Neon Rain v2")
└──────┬──────┘
       │ 1:N
┌──────▼──────┐
│   Tracks    │ (The actual MP3 files)
└─────────────┘

MANY-TO-MANY LINKING
┌─────────────┐         ┌──────────────────┐         ┌─────────────┐
│ Collections │◄───────┤ collection_tracks ├────────▶│   Tracks    │
└─────────────┘         └──────────────────┘         └─────────────┘
(Tracks can be in multiple collections simultaneously)

1:1 RELATIONSHIP
┌─────────────┐         ┌──────────────────┐
│   Tracks    │◄───────┤  track_comments   │
└─────────────┘         └──────────────────┘
(Each track has one comment record)
```

### Table Details

#### `collections`
Top-level groupings. The "Default" collection is created on startup and cannot be deleted.

```sql
id          TEXT PRIMARY KEY        -- UUID
name        TEXT NOT NULL           -- "Default", "Summer Vibes 2025"
description TEXT                    -- Optional
tags        TEXT                    -- JSON array: ["experimental", "wip"]
state       TEXT DEFAULT 'active'   -- State management
created_at  TIMESTAMP
updated_at  TIMESTAMP
```

**Key Field**: `name = "Default"` - Always exists, always first in UI

#### `projects`
Thematic containers within collections. Optional `collection_id` allows orphaned projects.

```sql
id            TEXT PRIMARY KEY
name          TEXT NOT NULL
description   TEXT
collection_id TEXT                  -- NULL = not assigned to collection
tags          TEXT                  -- JSON array
state         TEXT DEFAULT 'active'
mood          TEXT                  -- "dark", "uplifting", "melancholic"
created_at    TIMESTAMP
updated_at    TIMESTAMP
FOREIGN KEY (collection_id) REFERENCES collections(id) ON DELETE SET NULL
```

**Design Note**: `collection_id` is nullable to support projects created before assignment.

#### `ideas`
Song concepts within projects. Represents the creative concept, not implementation.

```sql
id              TEXT PRIMARY KEY
name            TEXT NOT NULL
project_id      TEXT NOT NULL       -- MUST belong to a project
description     TEXT
tags            TEXT                -- JSON array
state           TEXT DEFAULT 'concept'
reference_notes TEXT                -- Markdown/plain text for inspiration
created_at      TIMESTAMP
updated_at      TIMESTAMP
FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
```

**Cascade Delete**: Deleting a project deletes all its ideas.

#### `songs`
Specific implementations of ideas. Multiple songs can explore one idea (v1, v2, remix, etc.)

```sql
id          TEXT PRIMARY KEY
name        TEXT NOT NULL
idea_id     TEXT NOT NULL           -- MUST belong to an idea
description TEXT
tags        TEXT                    -- JSON array
state       TEXT DEFAULT 'draft'
version     TEXT                    -- "v1", "remix", "extended"
created_at  TIMESTAMP
updated_at  TIMESTAMP
FOREIGN KEY (idea_id) REFERENCES ideas(id) ON DELETE CASCADE
```

**Cascade Delete**: Deleting an idea deletes all its songs.

#### `tracks`
Core entity. Appears in BOTH workspace and library.

```sql
id                TEXT PRIMARY KEY
song_id           TEXT                    -- NULL = workspace-only, NOT NULL = in library

-- Source identification
source_type       TEXT NOT NULL           -- "suno" | "udio"
file_path         TEXT NOT NULL UNIQUE    -- Absolute path to MP3
suno_id           TEXT                    -- UUID from filename
udio_id           TEXT
image_path        TEXT                    -- Suno AI-generated cover art

-- Metadata
title             TEXT NOT NULL
duration_ms       INTEGER
style_desc        TEXT                    -- AI generation prompt

-- User review
rating            INTEGER                 -- 1-5 stars
is_trash          BOOLEAN DEFAULT 0
is_deleted        BOOLEAN DEFAULT 0       -- Soft delete

-- Tag taxonomies (all JSON arrays)
artist_tags       TEXT                    -- ["Artist Name"]
album_tags        TEXT                    -- ["Album Name"]
genre_tags        TEXT                    -- ["darkwave", "ebm"]
mood_tags         TEXT                    -- ["melancholic", "cinematic"]
tags              TEXT                    -- ["needs-remix", "extend-in-suno"]

metadata          TEXT                    -- JSON blob for extensibility
created_at        TIMESTAMP
updated_at        TIMESTAMP

FOREIGN KEY (song_id) REFERENCES songs(id) ON DELETE SET NULL
```

**Critical Fields**:
- `song_id = NULL`: Track is workspace-only (not assigned to any song)
- `song_id = <uuid>`: Track is part of library (assigned to a song)
- `file_path`: UNIQUE constraint ensures each file scanned once
- `is_deleted = 1`: Soft delete (file remains, just hidden in UI)

**Indexes**:
- `source_type`, `rating`, `is_trash`, `is_deleted`, `song_id`, `suno_id`, `udio_id`, `file_path`

#### `track_comments`
1:1 with tracks. Four-field comment system for reviewing tracks.

```sql
track_id    TEXT PRIMARY KEY        -- 1:1 with tracks
general     TEXT                    -- General observations
pluses      TEXT                    -- What's good
minuses     TEXT                    -- Minor issues (fixable)
blockers    TEXT                    -- Major issues (deal-breakers)
created_at  TIMESTAMP
updated_at  TIMESTAMP
FOREIGN KEY (track_id) REFERENCES tracks(id) ON DELETE CASCADE
```

**Pattern**: Keep = pluses outweigh minuses. Blockers = immediate reject.

#### `collection_tracks`
Many-to-many link. Tracks can appear in multiple collections.

```sql
id              TEXT PRIMARY KEY
collection_id   TEXT NOT NULL
track_id        TEXT NOT NULL
added_at        TIMESTAMP
FOREIGN KEY (collection_id) REFERENCES collections(id) ON DELETE CASCADE
FOREIGN KEY (track_id) REFERENCES tracks(id) ON DELETE CASCADE
UNIQUE(collection_id, track_id)  -- Prevent duplicates
```

**Use Case**: A track can be in "Summer Vibes" AND "Workout Mix" simultaneously.

## Service Layer

Services encapsulate business logic. Each entity has its own service.

### Pattern: Service Structure

```go
type XService struct {
    querier db.Querier  // sqlc-generated interface
}

func (s *XService) Create(ctx context.Context, input CreateInput) (*db.X, error)
func (s *XService) Get(ctx context.Context, id string) (*db.X, error)
func (s *XService) List(ctx context.Context) ([]db.X, error)
func (s *XService) Update(ctx context.Context, id string, input UpdateInput) (*db.X, error)
func (s *XService) Delete(ctx context.Context, id string) error
```

### Key Services

#### `CollectionService`
- **Special Method**: `EnsureDefaultCollection()` - Creates "Default" if missing (called on startup)
- **Null Safety**: `ListCollections()` returns `[]` never `nil`
- **Track Management**: Add/remove tracks from collections (many-to-many)

#### `ScannerService`
- **`ScanSunoFolders()`**: Walks `/dam-assets/suno/`, reads metadata from filenames
- **`ScanUdioFolders()`**: Walks `/dam-assets/udio/`, extracts UUIDs
- **Idempotency**: Re-scanning same files updates existing records (uses `file_path` UNIQUE constraint)
- **Timeout**: Frontend uses 10-minute timeout for large scans

**Suno Filename Parsing**:
```
14b40934-5ae4-4c0e-a62f-7c9b8f30e162.mp3
└─────────────── UUID ────────────────┘

Extracts: suno_id, looks for .webp image with same UUID
```

#### `WorkspaceService`
- **`GetTree()`**: Builds hierarchical folder structure for sidebar navigation
- **`ListSunoFolder(folder)`**: Returns all tracks in a Suno folder
- **`ListUdioPath(path)`**: Returns all tracks in a Udio path

**Tree Structure**:
```json
{
  "suno": {
    "folders": ["folder1", "folder2"],
    "counts": {"folder1": 42, "folder2": 17}
  },
  "udio": {
    "paths": ["path/to/tracks"],
    "counts": {"path/to/tracks": 8}
  }
}
```

#### `TrackService`
- **Metadata Updates**: Rating, tags, comments
- **Collection Queries**: `GetTrackCollections()` - Which collections contain this track?
- **Soft Delete**: Sets `is_deleted = 1`, doesn't remove file

## API Layer

### Architecture: Handler → Service → Database

```go
// Handler (dam_operations.go)
router.Get("/api/tracks/{id}", func(w http.ResponseWriter, r *http.Request) {
    id := chi.URLParam(r, "id")
    track, err := trackService.GetTrack(r.Context(), id)  // Service call
    if err != nil {
        respondError(w, http.StatusNotFound, "Track not found")
        return
    }
    respondJSON(w, http.StatusOK, map[string]interface{}{
        "track": ToTrackResponse(track)  // Convert to API response type
    })
})
```

### Critical Pattern: Response Type Conversion

**Problem**: sqlc generates `db.Project` with `sql.NullString` fields:
```go
type Project struct {
    Description  sql.NullString  // Serializes as {"String":"text","Valid":true}
    CollectionID sql.NullString
    Mood         sql.NullString
}
```

**Solution**: API response types in `internal/api/types.go`:
```go
type ProjectResponse struct {
    Description  string    `json:"description,omitempty"`  // Serializes as "text" or omitted
    CollectionID string    `json:"collection_id"`
    Mood         string    `json:"mood,omitempty"`
}

func ToProjectResponse(p db.Project) ProjectResponse {
    resp := ProjectResponse{
        ID: p.ID,
        Name: p.Name,
        Tags: parseJSONArray(p.Tags),  // JSON string → []string
    }
    if p.Description.Valid {
        resp.Description = p.Description.String
    }
    if p.CollectionID.Valid {
        resp.CollectionID = p.CollectionID.String
    }
    // ... etc
    return resp
}
```

**Applied to**: Collection, Project, Idea, Song (all converted in API handlers)

### Null Safety Pattern

**Service Layer**:
```go
func (s *CollectionService) ListCollections(ctx context.Context) ([]db.Collection, error) {
    collections, err := s.querier.ListCollections(ctx)
    if err != nil {
        return nil, err
    }
    // Ensure never nil (Go slices default to nil if uninitialized)
    if collections == nil {
        return []db.Collection{}, nil
    }
    return collections, nil
}
```

**Why**: sqlc's generated code can return `nil` for empty results. Frontend expects `[]`.

## Configuration

**Environment Variables**:
```bash
API_PORT=3000                               # Server port
DATA_PATH=./data                            # Database location
ASSETS_PATH=/run/media/dtb/DATA/dam-assets  # Audio files (NEVER modified)
```

**File Structure**:
```
/run/media/dtb/DATA/dam-assets/
├── suno/
│   ├── folder-name-1/
│   │   ├── 14b40934...mp3
│   │   └── 14b40934...webp  (image)
│   └── folder-name-2/
└── udio/
    └── path/to/files/
        └── uuid.mp3
```

## Request Flow Example

**User clicks "Create Project" in UI**:

1. **Frontend**: `projectsApi.create({ name: "X", collection_id: "..." })`
2. **HTTP**: `POST /api/projects` with JSON body
3. **Handler**: `RegisterProjectOperations()` receives request
4. **Service**: `projectService.CreateProject(ctx, input)`
   - Generates UUID
   - Marshals tags to JSON
   - Calls sqlc query: `querier.CreateProject(ctx, params)`
5. **Database**: `INSERT INTO projects ...` returns new row
6. **Service**: Returns `*db.Project`
7. **Handler**: Converts to `ProjectResponse` via `ToProjectResponse()`
8. **HTTP**: Responds with `{"project": {...}}`
9. **Frontend**: Receives clean JSON, adds to Pinia store

## Scanner Implementation

### Flow

1. **Trigger**: `POST /api/scanner/suno` or `/api/scanner/udio`
2. **Walk File System**: `filepath.Walk()` through `/dam-assets/`
3. **Parse Metadata**:
   - Extract UUID from filename
   - For Suno: Look for matching `.webp` image
   - Read MP3 duration (if possible)
4. **Upsert Database**:
   - `file_path` UNIQUE constraint prevents duplicates
   - Existing track: Update metadata
   - New track: Insert
5. **Response**: `{ "scanned": 1234, "created": 42, "updated": 8 }`

### Idempotency

Running scan multiple times:
- Doesn't create duplicate tracks
- Updates metadata if filename changed
- Safe to run repeatedly

## OpenAPI Documentation

Generated automatically by Huma v2. Available at `/docs` when server running.

**Auto-generated from**:
- Handler function signatures
- Request/response struct tags
- Huma operation definitions

## Development Notes

### Build & Run

```bash
go build -o dam-server ./cmd/server
./dam-server
```

### Database Migration

Schema is in `db/schema.sql`. Applied on startup via `database.ApplySchema()`.

**No migration system** - schema is applied with `CREATE TABLE IF NOT EXISTS`.

### sqlc Regeneration

If you modify `db/queries/*.sql`:
```bash
sqlc generate
```

Regenerates `internal/db/*.sql.go` files.

### Key Files

- `cmd/server/main.go` - Entry point, service initialization
- `internal/api/dam_operations.go` - All HTTP handlers
- `internal/api/types.go` - Response type conversions
- `internal/services/*.go` - Business logic
- `db/schema.sql` - Database schema
- `db/queries/*.sql` - SQL queries for sqlc

## Design Decisions

### Why SQLite?

- **Embedded**: No separate database server
- **Simple**: Single file database
- **Fast**: Good enough for personal use
- **Portable**: Easy to backup (just copy the file)

### Why sqlc?

- **Type Safety**: SQL errors caught at generation time
- **Performance**: No reflection, direct SQL
- **Clarity**: SQL in `.sql` files, not string literals

### Why Chi over Gin/Echo?

- **Lightweight**: Minimal dependencies
- **Standard**: Uses `net/http` types
- **Fast**: Efficient routing

### Why Huma?

- **OpenAPI**: Auto-generated documentation
- **Validation**: Request/response validation
- **Developer Experience**: Good error messages

### Why Response Type Conversion?

- **Clean API**: Frontend gets `"field": "value"` not `"field": {"String":"value","Valid":true}`
- **Consistency**: All APIs return clean JSON
- **Type Safety**: Separate API types from database types

## Gotchas

1. **CGO Required**: SQLite needs CGO. Build with `CGO_ENABLED=1`.
2. **File Paths**: Must be absolute paths in database.
3. **JSON Tags**: Stored as JSON strings in `TEXT` columns, not native JSON type.
4. **Null Handling**: Always convert `sql.NullString` before sending to frontend.
5. **Cascade Deletes**: Be careful - deleting a project deletes all ideas/songs/tracks!
6. **File Serving**: Backend serves files via `/files/*`, NOT from database.
