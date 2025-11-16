-- name: CreateSong :one
INSERT INTO songs (id, name, idea_id, description, tags, state, version)
VALUES (?, ?, ?, ?, ?, ?, ?)
RETURNING *;

-- name: GetSong :one
SELECT * FROM songs WHERE id = ? LIMIT 1;

-- name: ListSongs :many
SELECT * FROM songs ORDER BY name ASC;

-- name: ListSongsByIdea :many
SELECT * FROM songs WHERE idea_id = ? ORDER BY name ASC;

-- name: UpdateSong :one
UPDATE songs
SET
  name = COALESCE(sqlc.narg('name'), name),
  description = COALESCE(sqlc.narg('description'), description),
  tags = COALESCE(sqlc.narg('tags'), tags),
  state = COALESCE(sqlc.narg('state'), state),
  version = COALESCE(sqlc.narg('version'), version)
WHERE id = sqlc.arg('id')
RETURNING *;

-- name: DeleteSong :exec
DELETE FROM songs WHERE id = ?;
