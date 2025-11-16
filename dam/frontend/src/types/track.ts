export interface Track {
  id: string
  song_id?: string | null
  source_type: 'suno' | 'udio'
  file_path: string
  suno_id?: string | null
  udio_id?: string | null
  image_path?: string | null
  title: string
  duration_ms?: number | null
  style_desc?: string | null
  rating?: number | null
  is_trash: boolean
  is_deleted: boolean
  artist_tags?: string[] | null
  album_tags?: string[] | null
  genre_tags?: string[] | null
  mood_tags?: string[] | null
  tags?: string[] | null
  metadata?: Record<string, any> | null
  created_at: string
  updated_at: string
}

export interface TrackComment {
  track_id: string
  general?: string | null
  pluses?: string | null
  minuses?: string | null
  blockers?: string | null
  created_at: string
  updated_at: string
}

export interface TrackWithComment {
  track: Track
  comment?: TrackComment | null
}

export interface UpdateTrackInput {
  title?: string
  rating?: number | null
  style_desc?: string
  artist_tags?: string[]
  album_tags?: string[]
  genre_tags?: string[]
  mood_tags?: string[]
  tags?: string[]
}

export interface TrackCommentInput {
  general: string
  pluses: string
  minuses: string
  blockers: string
}
