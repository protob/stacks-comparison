import type { AlbumType, AlbumState, ArtistState, Extras } from './music'

export interface PlaylistFormData {
  name: string
  description: string
  state: 'concept' | 'sketch' | 'active'
  imageFile?: File | null
}

export interface AlbumFormData {
  title: string
  albumType: AlbumType
  state: AlbumState
  artistSelectionMode: 'existing' | 'new' | 'unlinked'
  existingArtistId: string
  newArtistName: string
  unlinkedArtistName: string
  imageFile?: File
  removeImage?: boolean
  tracks: TrackEditData[]
}

export interface TrackEditData {
  id?: string // Existing track ID
  title: string
  duration?: number // Duration in milliseconds
  file?: File // New audio file
  existingFile?: string // Current audio storage key
  _deleted?: boolean // Track deletion flag
}

export interface ArtistFormData {
  name: string
  about: string
  tags: string[]
  state: ArtistState
  imageFile?: File | null
}