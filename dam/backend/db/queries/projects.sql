-- name: CreateProject :one
INSERT INTO projects (id, name, description, collection_id, tags, state, mood)
VALUES (?, ?, ?, ?, ?, ?, ?)
RETURNING *;

-- name: GetProject :one
SELECT * FROM projects WHERE id = ? LIMIT 1;

-- name: ListProjects :many
SELECT * FROM projects ORDER BY name ASC;

-- name: ListProjectsByCollection :many
SELECT * FROM projects WHERE collection_id = ? ORDER BY name ASC;

-- name: UpdateProject :one
UPDATE projects
SET
  name = COALESCE(sqlc.narg('name'), name),
  description = COALESCE(sqlc.narg('description'), description),
  collection_id = COALESCE(sqlc.narg('collection_id'), collection_id),
  tags = COALESCE(sqlc.narg('tags'), tags),
  state = COALESCE(sqlc.narg('state'), state),
  mood = COALESCE(sqlc.narg('mood'), mood)
WHERE id = sqlc.arg('id')
RETURNING *;

-- name: DeleteProject :exec
DELETE FROM projects WHERE id = ?;
