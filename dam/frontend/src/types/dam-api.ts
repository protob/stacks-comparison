export interface Track {
  id: string
  song_id?: string | null
  source_type: 'suno' | 'udio'
  file_path: string
  suno_id?: string | null
  udio_id?: string | null
  image_path?: string | null  // Clean string, not sql.NullString object
  title: string
  duration_ms?: number | null
  rating?: number | null
  is_trash: boolean
  is_deleted: boolean
  artist_tags: string[]  // Always array, never null
  album_tags: string[]   // Always array, never null
  genre_tags: string[]   // Always array, never null
  mood_tags: string[]    // Always array, never null
  tags: string[]         // Always array, never null
  metadata: string       // JSON string
  created_at: string
  updated_at: string
}

export interface Collection {
  id: string
  name: string
  description: string | null
  tags: string[] | null
  state: string
  created_at: string
  updated_at: string
}

export interface Project {
  id: string
  name: string
  description: string | null
  collection_id: string | null
  tags: string[] | null
  state: string
  mood: string | null
  created_at: string
  updated_at: string
}

export interface Idea {
  id: string
  name: string
  project_id: string
  description: string | null
  tags: string[] | null
  state: string
  reference_notes: string | null
  created_at: string
  updated_at: string
}

export interface Song {
  id: string
  name: string
  idea_id: string
  description: string | null
  tags: string[] | null
  state: string
  version: string | null
  created_at: string
  updated_at: string
}

export interface ScanResult {
  total_found: number
  new_tracks: number
  existing_tracks: number
  errors: string[]
}