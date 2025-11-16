# DAM Frontend - Technical Documentation

Vue 3 SPA for Digital Audio Manager. Provides dual workspace/library interface for AI-generated music track organization.

**Core Concept**: Browse raw files (Workspace) OR curated hierarchy (Library). Same tracks, two views.

## Stack

- **Vue 3.5**: Composition API, `<script setup>` syntax
- **TypeScript 5.9**: Full type safety
- **Vite**: Build tool (Rolldown variant for speed)
- **Vue Router 4**: Client-side routing
- **Pinia 3**: State management
- **Tailwind CSS 4**: Utility-first styling
- **Axios**: HTTP client
- **FormKit**: Form handling
- **Unplugin Icons**: MDI + Heroicons
- **Bun**: Package manager + runtime

## Architecture Overview

### Application Structure

```
┌─────────────────────────────────────────────────────────────┐
│                      MainAppLayout                          │
│  ┌──────────┬──────────────────────┬─────────────────────┐  │
│  │          │                      │                     │  │
│  │ Sidebar  │   Router View        │   RightSidebar      │  │
│  │          │                      │   (Track Details)   │  │
│  │ - Workspace│  - WorkspaceView   │                     │  │
│  │   Tree   │  - LibraryView       │   - Title           │  │
│  │          │  - SettingsView      │   - Rating          │  │
│  │ - Library│                      │   - Tags            │  │
│  │   Tree   │                      │   - Comments        │  │
│  │          │                      │                     │  │
│  └──────────┴──────────────────────┴─────────────────────┘  │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │              GlobalPlayer (Audio Controls)               │ │
│  └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

### Data Flow Pattern

```
API Call                Store Update              Component Render
  │                        │                          │
  ├─ GET /api/collections  │                          │
  │                        │                          │
  ├─ Response: [{...}]────▶│ libraryStore            │
  │                        │  .collections = [...]    │
  │                        │                          │
  │                        ├─ Computed: libraryTree ─▶│ LibraryTree.vue
  │                        │  builds hierarchy        │  iterates tree
  │                        │                          │  renders nodes
  │                        │                          │
  │                        │                          │
User clicks Project       │                          │
  │                        │                          │
  ├─ ProjectFormModal     │                          │
  │  submits form          │                          │
  │                        │                          │
  ├─ POST /api/projects    │                          │
  │                        │                          │
  ├─ Response: {project}  │                          │
  │                        │                          │
  └─────────────────────▶ │ projects.push(project)  │
                           │                          │
                           └────────────────────────▶ │ Tree updates
                                                       │ (reactive)
```

## Dual Model Architecture

### Workspace Model

**Purpose**: Browse ALL tracks by file system structure (Suno folders, Udio paths)

**State**: `workspaceStore`
- `tree`: Hierarchical folder structure
- `currentPath`: Currently viewed folder

**Navigation Flow**:
1. App loads → `workspaceStore.loadTree()`
2. API: `GET /api/workspace/tree`
3. Response: `{ suno: { folders: [...] }, udio: { paths: [...] } }`
4. Sidebar renders tree with folder names + track counts
5. User clicks folder → Navigate to `/workspace/suno/folder-name`
6. `SunoFolderView` loads → `GET /api/workspace/suno/folder-name`
7. Displays grid of tracks in that folder

**Key Feature**: Read-only view. No CRUD operations. Just browse and play.

### Library Model

**Purpose**: Curated hierarchical organization (Collections → Projects → Ideas → Songs)

**State**: `libraryStore`
- `collections`: Array of all collections
- `projects`: Array of all projects
- `ideas`: Array of all ideas
- `songs`: Array of all songs
- `libraryTree`: Computed hierarchical structure

**Hierarchy Flow**:
1. App loads → `libraryStore.loadAllHierarchy()`
2. Parallel API calls:
   - `GET /api/collections`
   - `GET /api/projects`
   - `GET /api/ideas`
   - `GET /api/songs`
3. Pinia store builds `libraryTree` (computed property)
4. `LibraryTree.vue` renders expandable tree
5. User creates entities via modal forms
6. Tree automatically updates (reactive)

**Tree Structure** (computed):
```typescript
{
  [collectionId]: {
    collection: Collection,
    projects: {
      [projectId]: {
        project: Project,
        ideas: {
          [ideaId]: {
            idea: Idea,
            songs: Song[]
          }
        }
      }
    }
  }
}
```

### Track Duality

A track can exist in:
- **Workspace Only**: `song_id = NULL` in database
- **Library**: `song_id = <uuid>` links to a song
- **Multiple Collections**: via `collection_tracks` many-to-many

**Critical**: Same track appears in BOTH views if assigned to library. Metadata (rating, tags, comments) shared across views.

## Pinia Stores (State Management)

### `libraryStore`

**Purpose**: Manages library hierarchy

**State**:
```typescript
collections: Collection[]
projects: Project[]
ideas: Idea[]
songs: Song[]
currentCollection: Collection | null
currentProject: Project | null
currentIdea: Idea | null
currentSong: Song | null
loading: boolean
```

**Computed**:
```typescript
libraryTree: Record<string, TreeNode>  // Hierarchical structure
sortedCollections: Collection[]         // Default first, then alphabetical
defaultCollection: Collection | null    // Collection with name="Default"
```

**Key Actions**:
- `loadAllHierarchy()` - Loads all entities in parallel
- `createCollection()` - POST + push to array
- `createProject()` - POST + push to array
- `createIdea()` - POST + push to array
- `createSong()` - POST + push to array

**Critical Pattern**: All list endpoints use `|| []` fallback:
```typescript
async list() {
  const response = await api.get('/collections')
  return response.data.collections || []  // NEVER null
}
```

**Why**: Backend Go slices can be `nil`. Frontend expects `[]`.

### `workspaceStore`

**Purpose**: Manages workspace tree navigation

**State**:
```typescript
tree: WorkspaceTree | null
currentPath: string
loading: boolean
```

**Actions**:
- `loadTree()` - GET `/api/workspace/tree`
- `navigateToPath(path)` - Updates current path

**Tree Format**:
```typescript
{
  suno: {
    folders: string[],
    counts: Record<string, number>
  },
  udio: {
    paths: string[],
    counts: Record<string, number>
  }
}
```

### `tracksStore`

**Purpose**: Current view's track list + selected track

**State**:
```typescript
tracks: Track[]
selectedTrack: Track | null
loading: boolean
```

**Actions**:
- `loadTracks(folder)` - For workspace folder view
- `updateTrack(id, data)` - PATCH `/api/tracks/:id`
- `updateRating(id, rating)` - PATCH `/api/tracks/:id/rating`

**Not a Cache**: Tracks loaded per-view, not globally cached.

### `playerDamStore`

**Purpose**: Global audio player state

**State**:
```typescript
currentTrack: Track | null
playing: boolean
volume: number          // 0-1
progress: number        // 0-1 (current position)
duration: number        // seconds
audioElement: HTMLAudioElement | null
```

**Actions**:
- `play(track)` - Load track, start playback
- `pause()` - Pause playback
- `seek(position)` - Jump to position
- `setVolume(vol)` - 0-1, persisted to localStorage

**Key Pattern**: Single global audio element. Switching tracks = load new source.

### `uiStore`

**Purpose**: Toast notifications + global UI state

**State**:
```typescript
notifications: Array<{
  id: string,
  type: 'success' | 'error' | 'info',
  message: string,
  timeout: number
}>
```

**Actions**:
- `success(message)` - Green toast
- `error(message)` - Red toast
- `info(message)` - Blue toast

**Auto-dismiss**: 3-second timeout, then fade out.

### `scannerStore`

**Purpose**: File system scan operations

**State**:
```typescript
scanning: boolean
progress: { scanned: number, created: number, updated: number }
```

**Actions**:
- `scanSuno()` - POST `/api/scanner/suno`, 10min timeout
- `scanUdio()` - POST `/api/scanner/udio`, 10min timeout

**Long-Running**: Axios timeout set to 600000ms (10 minutes) for large scans.

## Component Architecture

### Layout Components (`components/global/`)

#### `Sidebar.vue`
Left sidebar. Shows workspace tree OR library tree based on current route.

**Logic**:
```typescript
const showLibraryTree = computed(() => route.path.startsWith('/library'))
const showWorkspaceTree = computed(() => route.path.startsWith('/workspace'))
```

**Features**:
- "New Collection" button (library mode)
- "Scan" button (workspace mode)
- Expandable tree nodes

#### `RightSidebar.vue`
Track details panel. Shows metadata for `playerStore.currentTrack`.

**Sections**:
- Title
- 5-star rating (interactive)
- Tags (Artist, Album, Genre, Mood, General)
- Comments (4-field system)
- "Save Metadata & Tags" button

**Edit Flow**:
1. User changes rating/tags/comments
2. Clicks save button
3. Calls `tracksApi.update(id, data)`
4. Success toast
5. Updates local track object (reactivity)

#### `GlobalPlayer.vue`
Bottom audio player bar.

**Controls**:
- Play/Pause
- Previous/Next (if queue exists)
- Seek bar
- Volume slider
- Current time / Duration

**State Source**: `playerDamStore`

**Waveform**: Not implemented. Just progress bar.

#### `TopBar.vue`
Top navigation bar.

**Elements**:
- DAM logo
- Search bar (placeholder, not implemented)
- Theme switcher
- Settings link

### Library Components (`components/library/`)

#### `LibraryTree.vue`
Renders hierarchical library tree in sidebar.

**Pattern**:
```vue
<div v-for="(collectionNode, collectionId) in libraryTree" :key="collectionId">
  <!-- Collection with expand/collapse -->
  <div v-if="expandedCollections[collectionId]">
    <div v-for="(projectNode, projectId) in collectionNode.projects">
      <!-- Project with expand/collapse -->
      <div v-if="expandedProjects[projectId]">
        <!-- Ideas... Songs... -->
      </div>
    </div>
  </div>
</div>
```

**Expansion State**: Local `ref` objects track which nodes are expanded.

**Auto-Expand**: Default collection auto-expands on mount:
```typescript
onMounted(() => {
  if (defaultCollection.value) {
    expandedCollections.value[defaultCollection.value.id] = true
  }
})
```

#### Modal Components

All entity creation uses modal pattern:
- `CollectionFormModal.vue`
- `ProjectFormModal.vue`
- `IdeaFormModal.vue`
- `SongFormModal.vue`

**Standard Pattern**:
```vue
<script setup>
const props = defineProps<{
  modelValue: boolean             // Open/close
  entity?: Entity | null          // Edit mode (optional)
  prefilledField?: string         // Pre-populate (e.g., collection_id)
}>()

const emit = defineEmits<{
  'update:modelValue': [boolean]
  'saved': [Entity]
}>()

const handleSubmit = async () => {
  const entity = await libraryStore.createX({ ... })
  uiStore.success(`X "${name.value}" created`)
  emit('saved', entity)
  close()
}
</script>

<template>
  <div v-if="modelValue" class="modal-backdrop">
    <form @submit.prevent="handleSubmit">
      <!-- Form fields -->
    </form>
  </div>
</template>
```

**Usage**:
```vue
<ProjectFormModal
  v-model="showModal"
  :prefilledCollectionId="currentCollection.id"
  @saved="onProjectCreated"
/>
```

### Track Components (`components/track/`)

#### `TrackRating.vue`
5-star rating component.

**Props**:
- `modelValue: number` - Current rating (1-5)
- `readonly: boolean` - Display-only mode

**Emits**:
- `update:modelValue` - New rating

**Stars**: Rendered as icons, clickable to set rating.

#### `TagInput.vue`
Multi-tag input for tag taxonomies.

**Props**:
- `modelValue: string[]` - Current tags
- `label: string` - "Artist", "Genre", etc.

**Features**:
- Add tag (Enter key or button)
- Remove tag (X button)
- Tag chips with color coding

**Pattern**: Each taxonomy (artist, album, genre, mood, general) uses separate `TagInput`.

#### `TrackCommentForm.vue`
4-field comment editor.

**Fields**:
- General (textarea)
- Pluses (textarea)
- Minuses (textarea)
- Blockers (textarea)

**Usage**: Embedded in RightSidebar for current track.

## Routing

**Routes** (`router/index.ts`):
```typescript
{
  path: '/',
  component: HomeView  // Welcome message
},
{
  path: '/workspace/:path(.*)*',  // Wildcard for nested paths
  component: SunoFolderView
},
{
  path: '/library',
  component: CollectionsView
},
{
  path: '/settings',
  component: SettingsView
}
```

**Navigation Examples**:
- `/workspace/suno/folder-name` → Workspace folder view
- `/workspace/udio/path/to/tracks` → Workspace Udio view
- `/library` → Collections grid
- `/library/collections/:id` → Collection detail (not implemented)

## API Integration (`api/damApi.ts`)

### Axios Configuration (`api/axios.ts`)

```typescript
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'

const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  timeout: 600000,  // 10 minutes for scans
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
})
```

### API Modules

All endpoints return clean promises. Null-safety applied to list responses.

**Collections**:
```typescript
collectionsApi.list()              // GET /api/collections
collectionsApi.get(id)             // GET /api/collections/:id
collectionsApi.create(data)        // POST /api/collections
collectionsApi.addTrack(cId, tId)  // POST /api/collections/:id/tracks
collectionsApi.removeTrack(cId, tId) // DELETE /api/collections/:id/tracks/:trackId
collectionsApi.getTracks(id)       // GET /api/collections/:id/tracks
```

**Projects, Ideas, Songs**: Same CRUD pattern

**Tracks**:
```typescript
tracksApi.get(id)                  // GET /api/tracks/:id
tracksApi.update(id, data)         // PATCH /api/tracks/:id
tracksApi.updateRating(id, rating) // PATCH /api/tracks/:id/rating
tracksApi.delete(id, hardDelete)   // DELETE /api/tracks/:id?hard_delete=bool
```

**Workspace**:
```typescript
workspaceApi.getTree()                    // GET /api/workspace/tree
workspaceApi.listSunoFolder(folder)       // GET /api/workspace/suno/:folder
workspaceApi.listUdioPath(path)           // GET /api/workspace/udio/:path
```

**Scanner**:
```typescript
scannerApi.scanSuno()  // POST /api/scanner/suno
scannerApi.scanUdio()  // POST /api/scanner/udio
```

### Null-Safety Pattern

**Every list endpoint**:
```typescript
list: async (): Promise<Collection[]> => {
  const response = await api.get('/collections')
  return response.data.collections || []  // Defensive
}
```

**Why**: Backend can return `{"collections": null}` if Go slice is nil. This breaks frontend iteration.

## File URL Construction

**Composable** (`composables/useFileUrl.ts`):
```typescript
export function useFileUrl() {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'

  const getFileUrl = (filePath: string) => {
    // filePath = "/run/media/.../suno/folder/uuid.mp3"
    // Extract from "/suno/" onward
    const match = filePath.match(/\/(suno|udio)\/.+/)
    if (match) {
      return `${apiBaseUrl}/files/${match[0]}`
    }
    return ''
  }

  return { getFileUrl }
}
```

**Usage**:
```vue
<script setup>
const { getFileUrl } = useFileUrl()
const track = { file_path: "/run/.../suno/folder/uuid.mp3" }
const audioUrl = getFileUrl(track.file_path)
// Result: http://localhost:3000/files/suno/folder/uuid.mp3
</script>

<template>
  <audio :src="audioUrl" />
</template>
```

## Theming

**CSS Variables** (`assets/css/index.css`):
```css
:root {
  --color-primary: #3b82f6;
  --color-surface: #1f2937;
  --color-background: #111827;
  --color-text-primary: #f9fafb;
  --color-text-muted: #9ca3af;
  --color-border: #374151;
}

[data-theme="light"] {
  --color-surface: #ffffff;
  --color-background: #f9fafb;
  --color-text-primary: #111827;
  /* ... */
}
```

**Theme Switcher** (`composables/useTheme.ts`):
```typescript
export function useTheme() {
  const theme = ref(localStorage.getItem('theme') || 'dark')

  const setTheme = (newTheme: 'light' | 'dark') => {
    theme.value = newTheme
    document.documentElement.setAttribute('data-theme', newTheme)
    localStorage.setItem('theme', newTheme)
  }

  return { theme, setTheme }
}
```

## Critical Patterns

### Default Collection Guarantee

**Backend**: `EnsureDefaultCollection()` called on startup

**Frontend**:
- `sortedCollections` computed always puts Default first
- `defaultCollection` computed finds by name
- Auto-expands in LibraryTree on mount

**Invariant**: Default collection ALWAYS exists, ALWAYS visible, ALWAYS first.

### Optimistic Updates (Not Implemented)

Currently: Create → Wait for API → Update store

**Future**: Create → Update store immediately → API call (revert on error)

### Form Validation

Using HTML5 `required` attribute. No advanced validation library yet.

**Example**:
```vue
<input
  v-model="name"
  type="text"
  required
  placeholder="Project name"
/>
```

### Error Handling

**Pattern**:
```typescript
try {
  await api.call()
  uiStore.success('Operation successful')
} catch (error) {
  console.error('Error:', error)
  uiStore.error('Operation failed')
}
```

**No global error handler**. Each action handles its own errors.

## Key Files

- `src/main.ts` - App entry, Pinia + Router setup
- `src/App.vue` - Root component with MainAppLayout
- `src/router/index.ts` - Route definitions
- `src/stores/library.ts` - Library hierarchy state
- `src/stores/workspace.ts` - Workspace tree state
- `src/stores/tracks.ts` - Track list state
- `src/stores/playerDam.ts` - Audio player state
- `src/api/axios.ts` - Axios instance config
- `src/api/damApi.ts` - All API endpoints
- `src/components/library/LibraryTree.vue` - Hierarchical tree renderer
- `src/components/global/RightSidebar.vue` - Track details panel
- `src/components/global/GlobalPlayer.vue` - Audio player
- `src/layouts/MainAppLayout.vue` - 3-column layout

## Design Decisions

### Why Pinia over Vuex?

- **Composition API Native**: Works seamlessly with `<script setup>`
- **TypeScript**: Better type inference
- **Simpler**: No mutations, just actions
- **DevTools**: Excellent Vue DevTools integration

### Why Not TanStack Query?

- **Simplicity**: Pinia + Axios is sufficient
- **Control**: Full control over cache invalidation
- **Learning Curve**: Team familiar with Pinia

### Why Tailwind CSS?

- **Utility-First**: Rapid prototyping
- **Consistency**: Design system via theme
- **Performance**: PurgeCSS removes unused styles
- **No CSS Files**: Styles in components (co-location)

### Why Modal Forms?

- **Focus**: User attention on form
- **Reusability**: Same modal for create/edit
- **UX**: Clear "save" or "cancel" actions

### Why Separate Workspace/Library Stores?

- **Separation of Concerns**: Different data sources
- **Performance**: Load library OR workspace, not both
- **Clarity**: Each store has single responsibility

## Performance Considerations

### Tree Rendering

**Computed Property**: `libraryTree` rebuilds on any change to collections/projects/ideas/songs.

**Optimization**: Use `v-if` on expanded nodes to avoid rendering hidden branches.

**Future**: Virtualize large trees (if >1000 nodes).

### Track Loading

**Lazy**: Tracks loaded only when navigating to folder.

**Not Cached**: Navigating away unloads tracks.

**Future**: LRU cache for recently viewed folders.

### Audio Preloading

**None**: Audio loaded on play, not on hover.

**Future**: Preload next track in queue.

## Gotchas

1. **Reactive Arrays**: Pinia uses Vue refs. Array mutations (push, splice) are reactive.
2. **Route Params**: `route.params.path` is array for wildcard routes. Join with `/`.
3. **File Paths**: Always use `getFileUrl()` composable, never construct manually.
4. **Theme Persistence**: Applied on mount via `useTheme()` composable.
5. **Player State**: Single audio element. Don't create multiple `<audio>` tags.
6. **Null Collections**: Backend can return null. Always use `|| []` in API calls.
7. **Modal v-model**: Use `v-model` for open/close, emit `saved` event for data.
8. **Auto-Expansion**: Only Default collection auto-expands. User must expand others.

## Build & Dev

**Dev Server**:
```bash
bun run dev
# http://localhost:5173
```

**Build**:
```bash
bun run build
# Output: dist/
```

**Type Check**:
```bash
bun run type-check
```

**Preview Build**:
```bash
bun run preview
```

## Environment Variables

`.env.local`:
```bash
VITE_API_BASE_URL=http://localhost:3000
```

**Access in code**:
```typescript
import.meta.env.VITE_API_BASE_URL
```
