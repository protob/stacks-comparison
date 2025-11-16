-- name: CreateCollection :one
INSERT INTO collections (id, name, description, tags, state)
VALUES (?, ?, ?, ?, ?)
RETURNING *;

-- name: GetCollection :one
SELECT * FROM collections WHERE id = ? LIMIT 1;

-- name: ListCollections :many
SELECT * FROM collections ORDER BY name ASC;

-- name: UpdateCollection :one
UPDATE collections
SET
  name = COALESCE(sqlc.narg('name'), name),
  description = COALESCE(sqlc.narg('description'), description),
  tags = COALESCE(sqlc.narg('tags'), tags),
  state = COALESCE(sqlc.narg('state'), state)
WHERE id = sqlc.arg('id')
RETURNING *;

-- name: DeleteCollection :exec
DELETE FROM collections WHERE id = ?;

-- name: AddTrackToCollection :one
INSERT INTO collection_tracks (id, collection_id, track_id)
VALUES (?, ?, ?)
RETURNING *;

-- name: RemoveTrackFromCollection :exec
DELETE FROM collection_tracks WHERE collection_id = ? AND track_id = ?;

-- name: GetCollectionTracks :many
SELECT t.* FROM tracks t
JOIN collection_tracks ct ON ct.track_id = t.id
WHERE ct.collection_id = ?
ORDER BY ct.added_at DESC;

-- name: GetTrackCollections :many
SELECT c.* FROM collections c
JOIN collection_tracks ct ON ct.collection_id = c.id
WHERE ct.track_id = ?;

-- name: IsTrackInAnyCollection :one
SELECT EXISTS(
    SELECT 1 FROM collection_tracks WHERE track_id = ?
) AS in_collection;
