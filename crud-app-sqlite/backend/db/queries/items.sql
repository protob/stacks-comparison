-- name: CreateItem :one
INSERT INTO items (
    id, slug, name, text, is_completed, priority, tags, categories
) VALUES (
    ?, ?, ?, ?, ?, ?, ?, ?
)
RETURNING *;

-- name: GetItem :one
SELECT * FROM items 
WHERE slug = ? AND json_extract(categories, '$[0]') = ? LIMIT 1;

-- name: GetItemByID :one
SELECT * FROM items WHERE id = ? LIMIT 1;

-- name: GetAllItems :many
SELECT * FROM items ORDER BY created_at DESC;

-- name: GetItemsByCategory :many
SELECT * FROM items 
WHERE json_extract(categories, '$[0]') = ?
ORDER BY created_at DESC;

-- name: UpdateItem :one
UPDATE items
SET 
    name = COALESCE(sqlc.narg('name'), name),
    slug = COALESCE(sqlc.narg('slug'), slug),
    text = COALESCE(sqlc.narg('text'), text),
    is_completed = COALESCE(sqlc.narg('is_completed'), is_completed),
    priority = COALESCE(sqlc.narg('priority'), priority),
    tags = COALESCE(sqlc.narg('tags'), tags),
    categories = COALESCE(sqlc.narg('categories'), categories)
WHERE id = ?
RETURNING *;

-- name: DeleteItem :exec
DELETE FROM items WHERE id = ?;

-- name: GetItemTree :many
SELECT 
    json_extract(categories, '$[0]') as category,
    json_group_array(
        json_object(
            'id', id,
            'slug', slug,
            'name', name,
            'text', text,
            'isCompleted', is_completed,
            'priority', priority,
            'tags', json(tags),
            'categories', json(categories),
            'createdAt', created_at,
            'updatedAt', updated_at
        )
    ) as items
FROM items
GROUP BY json_extract(categories, '$[0]')
ORDER BY category;