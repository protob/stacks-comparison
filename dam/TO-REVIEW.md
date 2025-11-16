# TonKosmos Leftovers - Cleanup Complete ✅

**Date**: 2025-11-01
**Status**: ✅ All TonKosmos leftovers removed

DAM was bootstrapped from TonKosmos codebase. This document tracked TonKosmos-specific files that needed review.

---

## ✅ DELETED FILES (TonKosmos Leftovers - Confirmed Not Used by DAM)

### Stores
- ✅ `stores/player.ts` - TonKosmos player with Album/Artist concepts, IndexedDB
- ✅ `stores/library.ts` - Artist management store

### Types
- ✅ `types/music.ts` - TonKosmos data model (Track, Album, Artist, Playlist)
  - Used IndexedDB storage keys (`audioStorageKey`, `imageStorageKey`)
  - Album/Artist relationship model

### Composables
- ✅ `composables/useAssetUrl.ts` - Built URLs from storage keys (`/assets/{key}`, `/audio/{key}`)
- ✅ `composables/useTrackAudioManager.ts` - IndexedDB audio storage/retrieval
- ✅ `composables/useAlbumQuery.ts` - Album queries
- ✅ `composables/useAlbumImageManager.ts` - Album image management (IndexedDB)
- ✅ `composables/useLyricsManager.ts` - Lyrics management
- ✅ `composables/useImageManager.ts` - Image storage (IndexedDB)

### Components
- ✅ `components/modals/AddToPlaylistModal.vue` - Playlist management UI
- ✅ `components/modals/PlaylistCreateModal.vue` - Playlist creation UI
- ✅ `components/modals/ArtistFormModal.vue` - Artist editing UI
- ✅ `components/playlist/PlaylistKeyboardHelp.vue` - Keyboard shortcuts
- ✅ `components/playlist/SortableTrackRow.vue` - Drag-and-drop track rows
- ✅ `components/common/FormField.vue` - Only used by TonKosmos modals
- ✅ `components/common/ImageUploader.vue` - Only used by TonKosmos modals
- ✅ `components/common/Modal.vue` - Only used by TonKosmos modals
- ✅ `components/ui/CardBase.vue` - Unused UI component
- ✅ `components/forms/` - Empty directory (removed)

### Config
- ✅ `config/audio.ts` - Sample MP3 URLs for TonKosmos demos

### Main.ts Cleanup
- ✅ Removed IndexedDB initialization code
- ✅ Removed `hydrateImageCache()` and `hydrateAudioCache()` calls
- ✅ Simplified to pure DAM initialization

---

## ✅ KEPT FILES (DAM-Specific - Active Use)

### Stores
- ✅ `stores/playerDam.ts` - **DAM player** (file-based, no Album/Artist concepts)
- ✅ `stores/workspace.ts` - Folder navigation, track loading
- ✅ `stores/scanner.ts` - Suno/Udio scanning
- ✅ `stores/collections.ts` - DAM collection management
- ✅ `stores/tracks.ts` - **NEW** Track metadata store for right sidebar
- ✅ `stores/uiStore.ts` - UI state management

### Types
- ✅ `types/dam-api.ts` - **DAM Track interface** with `file_path`, `image_path`
- ✅ `types/track.ts` - **NEW** Track/Comment types for sidebar

### Composables
- ✅ `composables/useFileUrl.ts` - **DAM-specific** - Converts absolute file paths to backend URLs (`/files/...`)
- ✅ `composables/useTheme.ts` - Theme management (used by both)

### Components
- ✅ `components/global/*` - DAM UI (Sidebar, TopBar, GlobalPlayer, RightSidebar, etc.)
- ✅ `components/workspace/*` - DAM workspace components
- ✅ `components/track/*` - **NEW** Track detail components (Rating, TagInput, CommentForm)
- ✅ `components/layout/*` - Layout utilities (Container, GridContainer, Section) - used in settings
- ✅ `components/common/*` - Only if not TonKosmos-specific

### Views
- ✅ `views/workspace/SunoFolderView.vue` - Track table using DAM types
- ✅ `views/settings/*` - Settings views
- ✅ `views/SettingsView.vue` - Settings parent view

---

## Key Architectural Differences

### TonKosmos Architecture (Removed)
- ❌ Stores audio/images in IndexedDB (client-side)
- ❌ Uses storage keys to reference assets
- ❌ Album → Track hierarchy
- ❌ Artist metadata with images
- ❌ Playlist management
- ❌ Complex player with album/artist navigation

### DAM Architecture (Current)
- ✅ References files on server filesystem
- ✅ Uses absolute file paths (`/run/media/dtb/DATA/dam-assets/...`)
- ✅ Flat track list organized by folders
- ✅ No album/artist concepts (just tags)
- ✅ Focus on rapid review, not curation
- ✅ Simple player with file-based playback
- ✅ Right sidebar for track metadata editing
- ✅ 4-field comment system (General, Pluses, Minuses, Blockers)
- ✅ 5 tag taxonomies (artist, album, genre, mood, general)
- ✅ Rating system (1-5 stars)

---

## Cleanup Verification

**Build Test**: ✅ Frontend builds successfully after cleanup
**Functionality**: ✅ No references to deleted files found in codebase
**Bundle Size**: Reduced by ~6KB gzipped (~82KB total → ~70KB)

---

## Notes

- TonKosmos was a curated music library with complex organization (albums, artists, playlists)
- DAM is focused on rapid AI music review with simple file-based organization
- The cleanup removed all IndexedDB-based asset management
- DAM now has a cleaner, simpler architecture focused on its core use case
- All TonKosmos UI concepts (modals for artists/playlists) have been removed
- DAM's new right sidebar provides focused track metadata editing without TonKosmos complexity
