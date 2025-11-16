-- name: CreateTrackComment :one
INSERT INTO track_comments (track_id, general, pluses, minuses, blockers)
VALUES (?, ?, ?, ?, ?)
RETURNING *;

-- name: GetTrackComment :one
SELECT * FROM track_comments WHERE track_id = ? LIMIT 1;

-- name: UpdateTrackComment :one
UPDATE track_comments
SET
  general = COALESCE(sqlc.narg('general'), general),
  pluses = COALESCE(sqlc.narg('pluses'), pluses),
  minuses = COALESCE(sqlc.narg('minuses'), minuses),
  blockers = COALESCE(sqlc.narg('blockers'), blockers)
WHERE track_id = sqlc.arg('track_id')
RETURNING *;

-- name: UpsertTrackComment :one
INSERT INTO track_comments (track_id, general, pluses, minuses, blockers)
VALUES (?, ?, ?, ?, ?)
ON CONFLICT(track_id) DO UPDATE SET
  general = excluded.general,
  pluses = excluded.pluses,
  minuses = excluded.minuses,
  blockers = excluded.blockers,
  updated_at = CURRENT_TIMESTAMP
RETURNING *;

-- name: DeleteTrackComment :exec
DELETE FROM track_comments WHERE track_id = ?;
