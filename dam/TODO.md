# DAM (Digital Audio Manager) - Project Status & TODO
ADD right sidne for tagging and metadatas

fix time dutraion and udio tacxks
## Session Summary (October 31, 2025)

### What Was Accomplished

#### 1. Fixed Core Backend Issues
- **Problem**: 500 errors when clicking Suno sidebar folders (1, 2, 3, etc.)
- **Root Cause**: Database schema was never being applied on startup
- **Files Modified**:
  - `backend/cmd/server/main.go` - Added schema initialization call
  - `backend/db/schema.sql` - Fixed trigger bug (track_comments referenced wrong column)

#### 2. Implemented Scan Functionality
- **Goal**: Allow users to scan Suno/Udio folders and populate database
- **Implementation**: Modal dialog with separate scan buttons for each source
- **Files Created**:
  - `frontend/src/components/global/ScanModal.vue` - Scan UI with results display
- **Files Modified**:
  - `frontend/src/components/global/TopBar.vue` - Added scan button in topbar
  - `frontend/src/components/global/Sidebar.vue` - Removed old scan link
  - `frontend/src/router/index.ts` - Removed unused /scan route
  - `frontend/src/stores/scanner.ts` - Separate loading states for Suno/Udio
  - `frontend/src/api/damApi.ts` - Extended timeout for scan operations (5 minutes)
  - `frontend/src/api/axios.ts` - Set default 60s timeout

#### 3. Solved SQLite Concurrency Problems
- **Problem**: "database is locked (5) (SQLITE_BUSY)" errors with 1000+ tracks
- **Root Cause**: Multiple goroutines trying to write simultaneously
- **Solution**: "Scan concurrently, write sequentially" pattern
- **Files Modified**:
  - `backend/internal/database/database.go` - Enabled WAL mode via PRAGMA, set MaxOpenConns(1)
  - `backend/internal/services/scanner_service.go` - Implemented worker pool pattern:
    - 10 scanner workers (read file system, check DB, prepare data)
    - 1 writer goroutine (sequential DB writes)
    - Result: Zero SQLITE_BUSY errors, ~15-20s for 1880 tracks

#### 4. Fixed API Response Type Issues
- **Problem**: Go's `sql.NullString` objects exposed in JSON, causing `TypeError: absolutePath.replace is not a function`
- **Root Cause**: Direct serialization of database types to JSON
- **Files Created**:
  - `backend/internal/api/types.go` - Clean API response types (TrackResponse)
- **Files Modified**:
  - `backend/internal/api/dam_operations.go` - Convert to TrackResponse before JSON serialization
  - `frontend/src/types/dam-api.ts` - Updated TypeScript Track interface
  - `frontend/src/composables/useFileUrl.ts` - Added type safety check

#### 5. Current State
-  Scanning works (Suno & Udio)
-  Zero database errors
-  Tracks display in table with images
-  Sidebar navigation works
-  Duplicate prevention works (re-scanning skips existing tracks)

---

## Architecture Overview

### Backend Structure
```
backend/
├──  cmd/server/main.go              # Entry point, schema initialization
├──  internal/
│   ├──  api/
│   │   ├──  dam_operations.go       # API route handlers
│   │   └──  types.go                # Clean API response types
│   ├──  database/database.go        # SQLite connection with WAL mode
│   ├──  services/
│   │   ├──  scanner_service.go      # Concurrent scan + sequential write
│   │   ├──  track_service.go        # Track CRUD operations
│   │   ├──  workspace_service.go    # Tree generation for sidebar
│   │   └──  collection_service.go   # Collection management
│   └──  db/                         # sqlc generated code
├──  db/
│   ├──  schema.sql                  # Database schema
│   └──  queries/                    # SQL queries for sqlc
```

### Frontend Structure
```
frontend/src/
├──  components/global/
│   ├──  Sidebar.vue                 # Dynamic workspace tree navigation
│   ├──  SidebarNode.vue             # Recursive tree node component
│   ├──  TopBar.vue                  # Scan button + search
│   └──  ScanModal.vue               # Scan dialog with results
├──  views/workspace/
│   └──  SunoFolderView.vue          # Track listing table (TanStack Table)
├──  stores/
│   ├──  workspace.ts                # Tree data & track loading
│   └──  scanner.ts                  # Scan operations
├──  api/
│   ├──  axios.ts                    # Axios instance with timeouts
│   └──  damApi.ts                   # API client methods
└──  composables/
    └──  useFileUrl.ts               # Convert file paths to URLs
```

### Key Design Decisions

#### Special Suno Folder Handling
- Suno structure: `suno/output/{1,2,3,...}/{mp3,image}/UUID.{mp3,jpg}`
- Sidebar shows numbered folders (1, 2, 3) as leaf nodes
- Images and MP3s are in separate directories but matched by UUID
- Image folder is NOT shown in sidebar (special handling to avoid confusion)

#### SQLite Concurrency Pattern
- Read operations: Concurrent (10 workers)
- Write operations: Sequential (1 writer goroutine)
- Eliminates all database locking issues
- WAL mode + busy_timeout provides additional safety

#### API Design
- Backend converts database types to clean JSON
- No `sql.NullString` objects exposed
- Nullable fields use Go pointers (`*string`) � JSON `null` or `"value"`
- Arrays always returned as `[]`, never `null`

---

## TODO List

### High Priority - Core Functionality

#### Audio Playback
- Implement global audio player
- Play/pause controls
- Track progress bar
- Volume control
- Queue management
- Keyboard shortcuts

#### Track Titles
- **Current Issue**: Titles are UUIDs (e.g., `14b40934-65e3-4196-9a6a-651df8eb0777`)
- **Root Cause**: Scanner doesn't parse JSON metadata files
- **Context**: Suno stores actual titles in `suno/json/{1,2,3,...}.json` files
- **Temporary Solution**: Add "Update Titles" button to manually parse JSONs
- **Proper Solution**: Parse JSON during scanning and populate titles in database

### Medium Priority - User Experience

#### Track Metadata Editing
- Inline title editing
- Rating system (1-5 stars)
- Tag management (artist, album, genre, mood, custom tags)
- Bulk edit support

#### Search & Filtering
- Global search across all tracks
- Filter by source (Suno/Udio)
- Filter by rating
- Filter by tags
- Date range filtering

#### Collections System
- Create/edit/delete collections
- Add tracks to collections
- Collection-based views
- Smart collections (auto-populate based on criteria)

### Low Priority - Polish & Features

#### UI Improvements
- Dark mode (already have ThemeSwitch component)
- Responsive layout for smaller screens
- Keyboard navigation in track list
- Context menu (right-click actions)

#### Performance
- Virtual scrolling for large track lists (1000+ tracks)
- Lazy loading images
- Track list pagination or infinite scroll

#### Advanced Features
- Export playlists
- Track comments/notes system (schema already has track_comments table)
- Trash/restore functionality (soft delete already implemented)
- Duplicate detection
- Waveform visualization

---

## Known Issues & Limitations

### Current Limitations
1. **No Audio Playback**: UI shows tracks but cannot play them yet
2. **UUID Titles**: All tracks show UUIDs instead of actual song names
3. **No Duration Data**: Duration shows `--:--` (not parsed from audio files)
4. **Static Ratings**: Rating column shows `` (not yet editable)
5. **No Udio Images**: Udio tracks have no cover art (Udio doesn't provide images)

### Technical Debt
- JSON parsing not implemented in scanner
- Audio metadata extraction not implemented (duration, bitrate, etc.)
- Tag arrays stored as JSON strings but not properly parsed
- No error recovery for failed scans (partial results are kept)

---

## Data Model

### File Structure Expected
```
/run/media/dtb/DATA/dam-assets/
├──  suno/
│   ├──  json/
│   │   ├──  1.json          # Metadata for folder 1 tracks
│   │   ├──  2.json          # Metadata for folder 2 tracks
│   │   └──  ...
│   └──  output/
│       ├──  1/
│       │   ├──  mp3/        # Audio files (UUID.mp3)
│       │   └──  image/      # Cover art (UUID.jpg)
│       ├──  2/
│       └──  ...
└──  udio/
    └──  sorted/
        ├──  2024/
        │   ├──  chiptune/
        │   ├──  lotr/
        │   └──  ...
        ├──  2025/
        └──  ...
```

### Database Tables (Relevant)
- `tracks` - Main track entity (file_path is UNIQUE constraint)
- `collections` - User-created collections
- `collection_tracks` - Many-to-many relationship
- `track_comments` - 1:1 with tracks (general, pluses, minuses, blockers)
- `songs`, `ideas`, `projects` - Future: hierarchical organization

---

## Next Session Goals

1. **Implement Audio Playback** - Make the DAM actually play music
2. **Fix Track Titles** - Parse JSON metadata and display real song names
3. **Add Basic Editing** - Allow users to rate and tag tracks
4. **Test at Scale** - Verify performance with full 5000+ track library

---

## Commands for Development

### Backend
```bash
cd backend
air  # Auto-reload on file changes
```

### Frontend
```bash
cd frontend
bun run dev  # Vite dev server
```

### Database
```bash
# View database
sqlite3 backend/data/dam.db

# Check WAL mode
sqlite3 backend/data/dam.db "PRAGMA journal_mode;"

# Count tracks
sqlite3 backend/data/dam.db "SELECT COUNT(*) FROM tracks;"
```

### Generate sqlc code (after SQL changes)
```bash
cd backend
sqlc generate
```

---

## Reference: Key File Paths

### Configuration
- Backend config: `backend/internal/config/config.go`
- Assets path: `/run/media/dtb/DATA/dam-assets`
- Database: `backend/data/dam.db`

### Critical Files
- Schema: `backend/db/schema.sql`
- Main entry: `backend/cmd/server/main.go`
- Scanner: `backend/internal/services/scanner_service.go`
- Track view: `frontend/src/views/workspace/SunoFolderView.vue`

---

**Last Updated**: October 31, 2025
**Status**: Functional - Scanning and browsing works, playback pending
