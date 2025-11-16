-- name: CreateIdea :one
INSERT INTO ideas (id, name, project_id, description, tags, state, reference_notes)
VALUES (?, ?, ?, ?, ?, ?, ?)
RETURNING *;

-- name: GetIdea :one
SELECT * FROM ideas WHERE id = ? LIMIT 1;

-- name: ListIdeas :many
SELECT * FROM ideas ORDER BY name ASC;

-- name: ListIdeasByProject :many
SELECT * FROM ideas WHERE project_id = ? ORDER BY name ASC;

-- name: UpdateIdea :one
UPDATE ideas
SET
  name = COALESCE(sqlc.narg('name'), name),
  description = COALESCE(sqlc.narg('description'), description),
  tags = COALESCE(sqlc.narg('tags'), tags),
  state = COALESCE(sqlc.narg('state'), state),
  reference_notes = COALESCE(sqlc.narg('reference_notes'), reference_notes)
WHERE id = sqlc.arg('id')
RETURNING *;

-- name: DeleteIdea :exec
DELETE FROM ideas WHERE id = ?;
