-- name: CreateTrack :one
INSERT INTO tracks (
    id, song_id, source_type, file_path, suno_id, udio_id, image_path,
    title, duration_ms, style_desc, rating, is_trash, is_deleted,
    artist_tags, album_tags, genre_tags, mood_tags, tags, metadata
)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
RETURNING *;

-- name: GetTrack :one
SELECT * FROM tracks WHERE id = ? LIMIT 1;

-- name: GetTrackByFilePath :one
SELECT * FROM tracks WHERE file_path = ? LIMIT 1;

-- name: ListTracks :many
SELECT * FROM tracks
WHERE is_deleted = 0
ORDER BY created_at DESC;

-- name: ListTracksBySource :many
SELECT * FROM tracks
WHERE source_type = ? AND is_deleted = 0
ORDER BY created_at DESC;

-- name: ListTracksByRating :many
SELECT * FROM tracks
WHERE rating = ? AND is_deleted = 0
ORDER BY created_at DESC;

-- name: ListTrashedTracks :many
SELECT * FROM tracks
WHERE is_trash = 1 AND is_deleted = 0
ORDER BY created_at DESC;

-- name: ListTracksBySong :many
SELECT * FROM tracks WHERE song_id = ? ORDER BY created_at ASC;

-- name: ListUnassignedTracks :many
SELECT * FROM tracks
WHERE song_id IS NULL AND is_deleted = 0
ORDER BY created_at DESC;

-- name: UpdateTrack :one
UPDATE tracks
SET
  song_id = COALESCE(sqlc.narg('song_id'), song_id),
  title = COALESCE(sqlc.narg('title'), title),
  duration_ms = COALESCE(sqlc.narg('duration_ms'), duration_ms),
  rating = COALESCE(sqlc.narg('rating'), rating),
  is_trash = COALESCE(sqlc.narg('is_trash'), is_trash),
  style_desc = COALESCE(sqlc.narg('style_desc'), style_desc),
  artist_tags = COALESCE(sqlc.narg('artist_tags'), artist_tags),
  album_tags = COALESCE(sqlc.narg('album_tags'), album_tags),
  genre_tags = COALESCE(sqlc.narg('genre_tags'), genre_tags),
  mood_tags = COALESCE(sqlc.narg('mood_tags'), mood_tags),
  tags = COALESCE(sqlc.narg('tags'), tags),
  metadata = COALESCE(sqlc.narg('metadata'), metadata)
WHERE id = sqlc.arg('id')
RETURNING *;

-- name: UpdateTrackRating :one
UPDATE tracks SET rating = ? WHERE id = ? RETURNING *;

-- name: UpdateTrackTrash :one
UPDATE tracks SET is_trash = ? WHERE id = ? RETURNING *;

-- name: SoftDeleteTrack :exec
UPDATE tracks SET is_deleted = 1 WHERE id = ?;

-- name: DeleteTrack :exec
DELETE FROM tracks WHERE id = ?;

-- name: DeleteAllTracks :exec
DELETE FROM tracks;

-- WORKSPACE QUERIES (file path based)

-- name: ListSunoTracksInFolder :many
SELECT * FROM tracks
WHERE source_type = 'suno'
  AND file_path LIKE ?
  AND is_deleted = 0
ORDER BY created_at DESC;

-- name: ListUdioTracksInPath :many
SELECT * FROM tracks
WHERE source_type = 'udio'
  AND file_path LIKE ?
  AND is_deleted = 0
ORDER BY created_at DESC;

-- name: UpdateTrackSong :one
UPDATE tracks SET song_id = ? WHERE id = ? RETURNING *;

-- name: BulkUpdateTracksSong :exec
UPDATE tracks SET song_id = ? WHERE id IN (sqlc.slice('ids'));
