# Backend Source Code Collection (crud-app-sqlite)

**Generated on:** nie, 16 lis 2025, 16:53:31 CET
**Backend directory:** /home/dtb/0-dev/00-nov-2025/shadcn-and-simiar/crud-app-sqlite/backend
**Tech Stack:** Go, SQLite, Huma, Chi, sqlc, Air

---

## `pkg/items/models.go`
```
package items

import "time"

// Priority represents the priority level of an item
type Priority string

const (
	PriorityLow  Priority = "low"
	PriorityMid  Priority = "mid"
	PriorityHigh Priority = "high"
)

// Item defines the structure for item data
type Item struct {
	ID          string    `json:"id" yaml:"id"`
	Slug        string    `json:"slug" yaml:"slug"`
	Name        string    `json:"name" yaml:"name"`
	Text        string    `json:"text" yaml:"text"`
	IsCompleted bool      `json:"isCompleted" yaml:"isCompleted"`
	Priority    Priority  `json:"priority" yaml:"priority"`
	Tags        []string  `json:"tags" yaml:"tags"`
	Categories  []string  `json:"categories" yaml:"categories"` // Single category enforced at API level
	CreatedAt   time.Time `json:"createdAt" yaml:"createdAt"`
	UpdatedAt   time.Time `json:"updatedAt" yaml:"updatedAt"`
}

// ItemInput defines the expected structure for creating an item
type ItemInput struct {
	Name       string   `json:"name"`
	Text       string   `json:"text"`
	Priority   Priority `json:"priority"`
	Tags       []string `json:"tags,omitempty"`
	Categories []string `json:"categories"` // Must have exactly one category
}

// ItemUpdateInput defines the expected structure for updating an item
type ItemUpdateInput struct {
	Name        *string   `json:"name,omitempty"`
	Text        *string   `json:"text,omitempty"`
	Priority    *Priority `json:"priority,omitempty"`
	Tags        []string  `json:"tags,omitempty"`
	Categories  []string  `json:"categories,omitempty"` // Must have exactly one category if provided
	IsCompleted *bool     `json:"isCompleted,omitempty"`
}

// ItemTree represents the hierarchical structure of items by category
type ItemTree map[string][]Item

```

## `sqlc.yaml`
```
version: "2"
sql:
  - engine: "sqlite"
    schema: "db/schema.sql"
    queries: "db/queries/"
    gen:
      go:
        package: "db"
        out: "internal/db"
        sql_package: "database/sql"
        emit_json_tags: true
        emit_prepared_queries: false
        emit_interface: true
        emit_exact_table_names: false
```

## `db/schema.sql`
```
-- Items CRUD Database Schema
-- SQLite schema for items management

-- Items table
CREATE TABLE IF NOT EXISTS items (
    id                TEXT PRIMARY KEY,
    slug              TEXT NOT NULL,
    name              TEXT NOT NULL,
    text              TEXT,
    is_completed      BOOLEAN NOT NULL DEFAULT 0,
    priority          TEXT NOT NULL DEFAULT 'mid',
    tags              TEXT, -- JSON array: ["tag1", "tag2"]
    categories        TEXT NOT NULL, -- JSON array with exactly one category: ["category"]
    created_at        TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at        TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_items_slug ON items(slug);
CREATE INDEX IF NOT EXISTS idx_items_is_completed ON items(is_completed);
CREATE INDEX IF NOT EXISTS idx_items_priority ON items(priority);
CREATE INDEX IF NOT EXISTS idx_items_created_at ON items(created_at);

-- Trigger to auto-update updated_at timestamp
CREATE TRIGGER IF NOT EXISTS update_items_updated_at
AFTER UPDATE ON items
FOR EACH ROW
BEGIN
    UPDATE items SET updated_at = CURRENT_TIMESTAMP WHERE id = OLD.id;
END;
```

## `db/queries/items.sql`
```
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
```

## `cmd/server/main.go`
```
package main

import (
	"fmt"
	"items-api/internal/api"
	"items-api/internal/config"
	"items-api/internal/database"
	"items-api/internal/services"
	"log"
	"net/http"
	"time"

	"github.com/danielgtaylor/huma/v2"
	"github.com/danielgtaylor/huma/v2/adapters/humachi"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
)

func main() {
	startTime := time.Now()

	// Load configuration
	cfg, err := config.LoadConfig()
	if err != nil {
		log.Fatalf("FATAL: Could not load config: %v", err)
	}

	// Ensure DB exists and schema applied if new
	created, err := database.EnsureDBExists(cfg.DatabaseURL, "db/schema.sql")
	if err != nil {
		log.Fatalf("FATAL: Database preparation failed: %v", err)
	}
	if created {
		fmt.Println("✅ Database created and schema applied")
	} else {
		fmt.Println("ℹ️ Database exists, skipping schema apply")
	}

	// Initialize database connection
	db, err := database.NewDatabase(cfg.DatabaseURL)
	if err != nil {
		log.Fatalf("FATAL: Could not initialize database: %v", err)
	}
	defer db.Close()

	fmt.Println("✅ Database connected successfully")

	// Initialize services
	itemService := services.NewItemService(db.Queries)

	// Initialize handlers
	itemHandler := api.NewItemHandler(itemService)

	// Setup router
	router := chi.NewRouter()

	// Middleware
	router.Use(middleware.Logger)
	router.Use(middleware.Recoverer)
	router.Use(cors.Handler(cors.Options{
		AllowedOrigins:   []string{"*"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
		ExposedHeaders:   []string{"Link"},
		AllowCredentials: true,
		MaxAge:           300,
	}))

	// Setup Huma API for OpenAPI documentation
	apiConfig := huma.DefaultConfig("Items CRUD API", "1.0.0")
	apiConfig.Info.Description = "Items CRUD API with SQLite, Huma, Chi, and sqlc"
	apiConfig.Servers = []*huma.Server{
		{URL: fmt.Sprintf("http://localhost:%s", cfg.Port)},
	}
	humaAPI := humachi.New(router, apiConfig)
	fmt.Println("📚 OpenAPI documentation available at /docs and /openapi.json")

	// Register routes
	itemHandler.RegisterRoutes(humaAPI, router)

	// Root endpoint - API info
	router.Get("/", api.GetInfo(cfg, startTime))

	// Health check endpoint
	router.Get("/health", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("OK"))
	})

	// Start server
	addr := cfg.GetAddr()
	fmt.Printf("🚀 Items API Server starting on http://localhost%s\n", addr)
	fmt.Printf("   Database: %s\n", cfg.DatabaseURL)

	if err := http.ListenAndServe(addr, router); err != nil {
		log.Fatalf("FATAL: Server failed to start: %v", err)
	}
}

```

## `README.md`
```
# Items CRUD API (SQLite Edition)

A fully functional CRUD API for managing items, refactored to use the same modern stack as the DAM project.

## Tech Stack (Matching DAM)

- **Database:** SQLite with WAL mode
- **ORM/Query Builder:** [sqlc](https://sqlc.dev/) - Compile-time safe SQL queries
- **HTTP Framework:** [Huma v2](https://huma.rocks/) - Modern OpenAPI-first framework
- **Router:** [Chi v5](https://github.com/go-chi/chi) - Lightweight, idiomatic router
- **Hot Reload:** [Air](https://github.com/air-verse/air) - Live reload for Go apps
- **Driver:** [modernc.org/sqlite](https://pkg.go.dev/modernc.org/sqlite) - Pure Go SQLite driver

## Key Features

✅ **Auto-generated OpenAPI docs** at `/docs` and `/openapi.json`
✅ **Type-safe database queries** with sqlc
✅ **Automatic schema migration** on startup
✅ **WAL mode** for better concurrency
✅ **Request logging** with Chi middleware
✅ **Hot reload** with Air for development
✅ **Same stack as DAM** for consistency

## Architecture

```
backend/
├── cmd/server/main.go          # Entry point
├── internal/
│   ├── api/handlers.go         # Huma API handlers
│   ├── config/config.go        # Configuration
│   ├── database/database.go    # DB initialization + schema application
│   ├── db/                     # Generated by sqlc
│   │   ├── db.go
│   │   ├── models.go
│   │   ├── items.sql.go        # Generated query methods
│   │   └── querier.go
│   ├── services/item_service.go # Business logic
│   └── common/                 # Shared utilities (errors, slugify, etc.)
├── db/
│   ├── schema.sql              # Database schema
│   └── queries/items.sql       # SQL queries for sqlc
├── sqlc.yaml                   # sqlc configuration
├── .air.toml                   # Air hot-reload config
└── go.mod
```

## Database Schema

Items are stored in SQLite with the following structure:

```sql
CREATE TABLE items (
    id                TEXT PRIMARY KEY,
    slug              TEXT NOT NULL,
    name              TEXT NOT NULL,
    text              TEXT,
    is_completed      BOOLEAN NOT NULL DEFAULT 0,
    priority          TEXT NOT NULL DEFAULT 'mid',
    tags              TEXT, -- JSON array
    categories        TEXT NOT NULL, -- JSON array (exactly one category)
    created_at        TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at        TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
```

**Indexes:**
- `idx_items_slug` on `slug`
- `idx_items_is_completed` on `is_completed`
- `idx_items_priority` on `priority`
- `idx_items_created_at` on `created_at`

**Triggers:**
- Auto-update `updated_at` timestamp on every update

## API Endpoints

All responses follow this format:
```json
{
  "success": true,
  "data": { ... }
}
```

### Endpoints

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/health` | Health check |
| `GET` | `/docs` | Interactive OpenAPI documentation |
| `GET` | `/openapi.json` | OpenAPI spec |
| `GET` | `/api/items/tree` | Get all items organized by category |
| `POST` | `/api/items` | Create a new item |
| `GET` | `/api/items/{categorySlug}/{itemSlug}` | Get a specific item |
| `PATCH` | `/api/items/{categorySlug}/{itemSlug}` | Update an item |
| `DELETE` | `/api/items/{categorySlug}/{itemSlug}` | Delete an item |

## Running the Server

### Prerequisites

- Go 1.23+ installed
- `sqlc` installed (for regenerating queries): `go install github.com/sqlc-dev/sqlc/cmd/sqlc@latest`
- `air` installed (for hot reload): `go install github.com/air-verse/air@latest`

### Quick Start

```bash
cd backend

# Install dependencies
go mod download

# Run with hot reload (recommended for development)
air

# OR run directly
go run ./cmd/server/main.go
```

The server will:
1. Initialize SQLite database at `./data/items.db`
2. Apply schema automatically
3. Start on port `3000` (configurable)
4. Print startup logs with emojis ✅🚀📚

### Environment Variables

- `ITEMS_PORT`: Port to run the API on (default: `3000`)
- `ITEMS_DATA_PATH`: Path to the data directory (default: `./data`)
- `DATABASE_URL`: SQLite database path (default: `./data/items.db`)

## Example Usage

### Create an item

```bash
curl -X POST http://localhost:3000/api/items \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Buy groceries",
    "text": "Get milk, bread, and eggs",
    "priority": "high",
    "tags": ["shopping", "food"],
    "categories": ["personal"]
  }'
```

Response:
```json
{
  "success": true,
  "data": {
    "id": "f47ac10b-...",
    "slug": "buy-groceries",
    "name": "Buy groceries",
    "text": "Get milk, bread, and eggs",
    "isCompleted": false,
    "priority": "high",
    "tags": ["shopping", "food"],
    "categories": ["personal"],
    "createdAt": "2025-11-16T10:30:00Z",
    "updatedAt": "2025-11-16T10:30:00Z"
  }
}
```

### Get all items (tree view)

```bash
curl http://localhost:3000/api/items/tree
```

Response:
```json
{
  "success": true,
  "data": {
    "personal": [
      {
        "id": "f47ac10b-...",
        "slug": "buy-groceries",
        "name": "Buy groceries",
        ...
      }
    ],
    "work": [...]
  }
}
```

### Get a specific item

```bash
curl http://localhost:3000/api/items/personal/buy-groceries
```

### Update an item

```bash
curl -X PATCH http://localhost:3000/api/items/personal/buy-groceries \
  -H "Content-Type: application/json" \
  -d '{
    "isCompleted": true
  }'
```

### Delete an item

```bash
curl -X DELETE http://localhost:3000/api/items/personal/buy-groceries
```

## Development Workflow

### Modify Database Schema

1. Edit `db/schema.sql`
2. Run schema migration: `go run ./cmd/server/main.go` (applies automatically)

### Modify SQL Queries

1. Edit `db/queries/items.sql`
2. Regenerate Go code: `sqlc generate`
3. The generated code appears in `internal/db/`

### Hot Reload with Air

When using `air`, the server automatically rebuilds and restarts when you change:
- `.go` files
- `.sql` files
- Templates (if any)

## Production Build

To create a static binary for deployment:

```bash
cd backend
go build -ldflags="-w -s" -o items-api ./cmd/server
```

Then run:
```bash
./items-api
```

## Key Differences from Original crud-app

| Feature | Original (./crud-app) | Refactored (./crud-app-sqlite) |
|---------|----------------------|--------------------------------|
| Storage | YAML files | SQLite database |
| Queries | File system operations | Type-safe sqlc queries |
| API Framework | Raw Chi handlers | Huma v2 (OpenAPI-first) |
| Documentation | None | Auto-generated at `/docs` |
| Hot Reload | Manual restart | Air (automatic) |
| Schema | Implicit (file structure) | Explicit (schema.sql) |
| Logging | Basic fmt.Println | Chi middleware.Logger |
| Database Setup | N/A | Automatic schema application |

## Database Configuration (Matching DAM)

The database is configured with optimal settings for SQLite:

```go
PRAGMA foreign_keys = ON           // Enforce foreign key constraints
PRAGMA journal_mode = WAL          // Write-Ahead Logging for concurrency
PRAGMA busy_timeout = 5000         // Wait 5s on lock
PRAGMA synchronous = NORMAL        // Balance safety/speed
PRAGMA cache_size = -64000         // 64MB cache
PRAGMA temp_store = MEMORY         // Keep temp tables in RAM
```

Connection pool: `MaxOpenConns=1`, `MaxIdleConns=1` (SQLite single-writer optimization)

## Troubleshooting

### "Database locked" errors
The server uses WAL mode and connection pool limits to prevent this. If it still occurs, check that no other process is accessing the database.

### Schema not applying
Delete `./data/items.db` and restart. The schema applies automatically on startup.

### Port already in use
Change the port: `ITEMS_PORT=3001 go run ./cmd/server/main.go`

## Testing

Visit the interactive API documentation at `http://localhost:3000/docs` to test all endpoints in your browser.

---

**Status:** ✅ Fully functional backend matching DAM stack (SQLite + Huma + Chi + sqlc + Air)

```

## `internal/services/item_service.go`
```
package services

import (
	"context"
	"database/sql"
	"encoding/json"
	"fmt"
	"items-api/internal/common"
	"items-api/internal/db"
	"items-api/pkg/items"

	"github.com/google/uuid"
)

type ItemService struct {
	queries *db.Queries
}

func NewItemService(queries *db.Queries) *ItemService {
	return &ItemService{
		queries: queries,
	}
}

// Helper functions for JSON handling
func tagsToString(tags []string) sql.NullString {
	if len(tags) == 0 {
		return sql.NullString{Valid: false}
	}
	data, _ := json.Marshal(tags)
	return sql.NullString{String: string(data), Valid: true}
}

func stringToTags(s sql.NullString) []string {
	if !s.Valid || s.String == "" {
		return []string{}
	}
	var tags []string
	json.Unmarshal([]byte(s.String), &tags)
	return tags
}

func categoriesToString(categories []string) (string, error) {
	if len(categories) != 1 {
		return "", fmt.Errorf("exactly one category is required")
	}
	data, _ := json.Marshal(categories)
	return string(data), nil
}

func stringToCategories(s string) []string {
	var categories []string
	json.Unmarshal([]byte(s), &categories)
	return categories
}

func dbItemToItem(dbItem db.Item) *items.Item {
	return &items.Item{
		ID:          dbItem.ID,
		Slug:        dbItem.Slug,
		Name:        dbItem.Name,
		Text:        dbItem.Text.String,
		IsCompleted: dbItem.IsCompleted,
		Priority:    items.Priority(dbItem.Priority),
		Tags:        stringToTags(dbItem.Tags),
		Categories:  stringToCategories(dbItem.Categories),
		CreatedAt:   dbItem.CreatedAt,
		UpdatedAt:   dbItem.UpdatedAt,
	}
}

func (s *ItemService) CreateItem(input items.ItemInput) (*items.Item, error) {
	// Validate input
	if input.Name == "" {
		return nil, fmt.Errorf("%w: name is required", common.ErrInvalidInput)
	}
	if len(input.Categories) != 1 {
		return nil, fmt.Errorf("%w: exactly one category is required", common.ErrInvalidInput)
	}

	id := uuid.New().String()
	slug := common.Slugify(input.Name)

	categoriesStr, err := categoriesToString(input.Categories)
	if err != nil {
		return nil, err
	}

	// Check if item already exists
	categorySlug := common.Slugify(input.Categories[0])
	_, err = s.queries.GetItem(context.Background(), db.GetItemParams{
		Slug:       slug,
		Categories: categorySlug,
	})
	if err == nil {
		return nil, fmt.Errorf("%w: item with name '%s' already exists in category '%s'", common.ErrConflict, input.Name, categorySlug)
	}

	// Set defaults
	priority := string(input.Priority)
	if priority == "" {
		priority = string(items.PriorityMid)
	}

	// Create item
	dbItem, err := s.queries.CreateItem(context.Background(), db.CreateItemParams{
		ID:          id,
		Slug:        slug,
		Name:        input.Name,
		Text:        sql.NullString{String: input.Text, Valid: input.Text != ""},
		IsCompleted: false,
		Priority:    priority,
		Tags:        tagsToString(input.Tags),
		Categories:  categoriesStr,
	})
	if err != nil {
		return nil, fmt.Errorf("%w: failed to create item: %v", common.ErrStorage, err)
	}

	return dbItemToItem(dbItem), nil
}

func (s *ItemService) GetItem(categorySlug, itemSlug string) (*items.Item, error) {
	dbItem, err := s.queries.GetItem(context.Background(), db.GetItemParams{
		Slug:       itemSlug,
		Categories: categorySlug,
	})
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, fmt.Errorf("%w: item not found", common.ErrNotFound)
		}
		return nil, fmt.Errorf("%w: failed to get item: %v", common.ErrStorage, err)
	}

	return dbItemToItem(dbItem), nil
}

func (s *ItemService) GetItemTree() (items.ItemTree, error) {
	// Get all items
	allItems, err := s.queries.GetAllItems(context.Background())
	if err != nil {
		return nil, fmt.Errorf("%w: failed to get items: %v", common.ErrStorage, err)
	}

	// Group by category
	tree := make(items.ItemTree)
	for _, dbItem := range allItems {
		item := dbItemToItem(dbItem)
		categories := stringToCategories(dbItem.Categories)
		if len(categories) > 0 {
			category := categories[0]
			tree[category] = append(tree[category], *item)
		}
	}

	// Sort items in each category by creation date (newest first)
	for category := range tree {
		items := tree[category]
		for i := 0; i < len(items)-1; i++ {
			for j := i + 1; j < len(items); j++ {
				if items[i].CreatedAt.Before(items[j].CreatedAt) {
					items[i], items[j] = items[j], items[i]
				}
			}
		}
	}

	return tree, nil
}

func (s *ItemService) UpdateItem(categorySlug, itemSlug string, input items.ItemUpdateInput) (*items.Item, error) {
	// Get existing item first
	existing, err := s.queries.GetItem(context.Background(), db.GetItemParams{
		Slug:       itemSlug,
		Categories: categorySlug,
	})
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, fmt.Errorf("%w: item not found", common.ErrNotFound)
		}
		return nil, fmt.Errorf("%w: failed to get item: %v", common.ErrStorage, err)
	}

	// Prepare updates
	updateParams := db.UpdateItemParams{
		ID: existing.ID,
	}

	updated := false
	newSlug := itemSlug
	newCategorySlug := categorySlug

	if input.Name != nil && *input.Name != existing.Name {
		updateParams.Name = sql.NullString{String: *input.Name, Valid: true}
		newSlug = common.Slugify(*input.Name)
		updateParams.Slug = sql.NullString{String: newSlug, Valid: true}
		updated = true
	}

	if input.Text != nil {
		updateParams.Text = sql.NullString{String: *input.Text, Valid: true}
		updated = true
	}

	if input.Priority != nil {
		updateParams.Priority = sql.NullString{String: string(*input.Priority), Valid: true}
		updated = true
	}

	if input.IsCompleted != nil {
		updateParams.IsCompleted = sql.NullBool{Bool: *input.IsCompleted, Valid: true}
		updated = true
	}

	if input.Tags != nil {
		updateParams.Tags = tagsToString(input.Tags)
		updated = true
	}

	if input.Categories != nil {
		if len(input.Categories) != 1 {
			return nil, fmt.Errorf("%w: exactly one category is required", common.ErrInvalidInput)
		}
		newCategorySlug = common.Slugify(input.Categories[0])
		categoriesStr, err := categoriesToString(input.Categories)
		if err != nil {
			return nil, err
		}
		updateParams.Categories = sql.NullString{String: categoriesStr, Valid: true}
		updated = true
	}

	if !updated {
		return dbItemToItem(existing), nil
	}

	// Check for conflicts if slug or category changed
	if newSlug != itemSlug || newCategorySlug != categorySlug {
		conflictItem, err := s.queries.GetItem(context.Background(), db.GetItemParams{
			Slug:       newSlug,
			Categories: newCategorySlug,
		})
		if err == nil && conflictItem.ID != existing.ID {
			return nil, fmt.Errorf("%w: target location already occupied by different item", common.ErrConflict)
		}
	}

	// Update item
	dbItem, err := s.queries.UpdateItem(context.Background(), updateParams)
	if err != nil {
		return nil, fmt.Errorf("%w: failed to update item: %v", common.ErrStorage, err)
	}

	return dbItemToItem(dbItem), nil
}

func (s *ItemService) DeleteItem(categorySlug, itemSlug string) error {
	// Get item to verify it exists
	existing, err := s.queries.GetItem(context.Background(), db.GetItemParams{
		Slug:       itemSlug,
		Categories: categorySlug,
	})
	if err != nil {
		if err == sql.ErrNoRows {
			return fmt.Errorf("%w: item not found", common.ErrNotFound)
		}
		return fmt.Errorf("%w: failed to get item: %v", common.ErrStorage, err)
	}

	// Delete item
	err = s.queries.DeleteItem(context.Background(), existing.ID)
	if err != nil {
		return fmt.Errorf("%w: failed to delete item: %v", common.ErrStorage, err)
	}

	return nil
}

```

## `internal/common/slugify.go`
```
package common

import (
	"regexp"
	"strings"
)

var (
	nonAlphanumericHyphenRegex = regexp.MustCompile(`[^a-z0-9-]+`)
	whitespaceRegex            = regexp.MustCompile(`\s+`)
	hyphenRegex                = regexp.MustCompile(`-+`)
)

// Slugify generates a simple slug (lowercase, hyphens)
func Slugify(s string) string {
	if s == "" {
		return ""
	}

	slug := strings.ToLower(s)
	slug = whitespaceRegex.ReplaceAllString(slug, "-")            // Replace whitespace with hyphen
	slug = nonAlphanumericHyphenRegex.ReplaceAllString(slug, "-") // Replace non-alphanumeric with hyphen
	slug = strings.Trim(slug, "-")                                // Trim leading/trailing hyphens
	slug = hyphenRegex.ReplaceAllString(slug, "-")                // Remove consecutive hyphens

	return slug
}

```

## `internal/common/errors.go`
```
package common

import (
	"errors"
)

// Define common error types
var (
	ErrNotFound     = errors.New("resource not found")
	ErrInvalidInput = errors.New("invalid input")
	ErrStorage      = errors.New("storage error")
	ErrConflict     = errors.New("resource conflict")
)

// ErrorResponse is a standard structure for JSON error responses
type ErrorResponse struct {
	Success bool   `json:"success"`
	Data    any    `json:"data"`
	Message string `json:"message,omitempty"`
	Status  int    `json:"status,omitempty"`
}

// Error implements the error interface
func (e ErrorResponse) Error() string {
	return e.Message
}

// NewErrorResponse creates a standard error response
func NewErrorResponse(message string, statusCode int) ErrorResponse {
	return ErrorResponse{
		Success: false,
		Data:    nil,
		Message: message,
		Status:  statusCode,
	}
}

```

## `internal/common/fsutils.go`
```
package common

import (
	"fmt"
	"os"
	"path/filepath"

	"gopkg.in/yaml.v3"
)

// EnsureDir creates a directory if it doesn't exist
func EnsureDir(dirPath string) error {
	err := os.MkdirAll(dirPath, 0755)
	if err != nil {
		return fmt.Errorf("failed to ensure directory %s: %w", dirPath, err)
	}
	return nil
}

// WriteYAML writes the given data structure as YAML to the specified file path
func WriteYAML(filePath string, data interface{}) error {
	yamlData, err := yaml.Marshal(data)
	if err != nil {
		return fmt.Errorf("failed to marshal YAML for %s: %w", filePath, err)
	}

	if err := EnsureDir(filepath.Dir(filePath)); err != nil {
		return err
	}

	err = os.WriteFile(filePath, yamlData, 0644)
	if err != nil {
		return fmt.Errorf("failed to write YAML file %s: %w", filePath, err)
	}
	return nil
}

// ReadYAML reads a YAML file from the specified path into the given data structure
func ReadYAML(filePath string, data interface{}) error {
	yamlFile, err := os.ReadFile(filePath)
	if err != nil {
		if os.IsNotExist(err) {
			return fmt.Errorf("common.ReadYAML %w: %s", ErrNotFound, filePath)
		}
		return fmt.Errorf("failed to read YAML file %s: %w", filePath, err)
	}

	err = yaml.Unmarshal(yamlFile, data)
	if err != nil {
		return fmt.Errorf("failed to unmarshal YAML file %s: %w", filePath, err)
	}
	return nil
}

// RemoveFile removes a file if it exists
func RemoveFile(filePath string) error {
	err := os.Remove(filePath)
	if err != nil && !os.IsNotExist(err) {
		return fmt.Errorf("failed to remove file %s: %w", filePath, err)
	}
	return nil
}

// RemoveDir removes a directory if it exists
func RemoveDir(dirPath string) error {
	err := os.RemoveAll(dirPath)
	if err != nil && !os.IsNotExist(err) {
		return fmt.Errorf("failed to remove directory %s: %w", dirPath, err)
	}
	return nil
}

// ListDirs returns a list of directory names in the given path
func ListDirs(dirPath string) ([]string, error) {
	if _, err := os.Stat(dirPath); os.IsNotExist(err) {
		return []string{}, nil
	}

	entries, err := os.ReadDir(dirPath)
	if err != nil {
		return nil, fmt.Errorf("failed to read directory %s: %w", dirPath, err)
	}

	var dirs []string
	for _, entry := range entries {
		if entry.IsDir() {
			dirs = append(dirs, entry.Name())
		}
	}

	return dirs, nil
}

```

## `internal/common/response.go`
```
package common

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"
)

// APIResponse represents the standard API response format
type APIResponse struct {
	Success bool   `json:"success"`
	Data    any    `json:"data"`
	Message string `json:"message,omitempty"`
}

// RespondWithJSON sends a JSON response
func RespondWithJSON(w http.ResponseWriter, code int, payload interface{}) {
	w.Header().Set("Content-Type", "application/json")

	response, err := json.Marshal(payload)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error marshalling JSON response: %v\n", err)
		errResp := NewErrorResponse("Internal server error", http.StatusInternalServerError)
		errBytes, _ := json.Marshal(errResp)
		w.WriteHeader(http.StatusInternalServerError)
		w.Write(errBytes)
		return
	}

	w.WriteHeader(code)
	w.Write(response)
}

// RespondWithError sends a JSON error response
func RespondWithError(w http.ResponseWriter, errResp ErrorResponse) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(errResp.Status)

	response, err := json.Marshal(errResp)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error marshalling ErrorResponse: %v\n", err)
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		return
	}

	w.Write(response)
}

// RespondWithSuccess sends a successful JSON response
func RespondWithSuccess(w http.ResponseWriter, data interface{}, message ...string) {
	msg := ""
	if len(message) > 0 {
		msg = message[0]
	}

	response := APIResponse{
		Success: true,
		Data:    data,
		Message: msg,
	}

	RespondWithJSON(w, http.StatusOK, response)
}

```

## `internal/db/db.go`
```
// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.29.0

package db

import (
	"context"
	"database/sql"
)

type DBTX interface {
	ExecContext(context.Context, string, ...interface{}) (sql.Result, error)
	PrepareContext(context.Context, string) (*sql.Stmt, error)
	QueryContext(context.Context, string, ...interface{}) (*sql.Rows, error)
	QueryRowContext(context.Context, string, ...interface{}) *sql.Row
}

func New(db DBTX) *Queries {
	return &Queries{db: db}
}

type Queries struct {
	db DBTX
}

func (q *Queries) WithTx(tx *sql.Tx) *Queries {
	return &Queries{
		db: tx,
	}
}

```

## `internal/db/items.sql.go`
```
// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.29.0
// source: items.sql

package db

import (
	"context"
	"database/sql"
)

const createItem = `-- name: CreateItem :one
INSERT INTO items (
    id, slug, name, text, is_completed, priority, tags, categories
) VALUES (
    ?, ?, ?, ?, ?, ?, ?, ?
)
RETURNING id, slug, name, text, is_completed, priority, tags, categories, created_at, updated_at
`

type CreateItemParams struct {
	ID          string         `json:"id"`
	Slug        string         `json:"slug"`
	Name        string         `json:"name"`
	Text        sql.NullString `json:"text"`
	IsCompleted bool           `json:"is_completed"`
	Priority    string         `json:"priority"`
	Tags        sql.NullString `json:"tags"`
	Categories  string         `json:"categories"`
}

func (q *Queries) CreateItem(ctx context.Context, arg CreateItemParams) (Item, error) {
	row := q.db.QueryRowContext(ctx, createItem,
		arg.ID,
		arg.Slug,
		arg.Name,
		arg.Text,
		arg.IsCompleted,
		arg.Priority,
		arg.Tags,
		arg.Categories,
	)
	var i Item
	err := row.Scan(
		&i.ID,
		&i.Slug,
		&i.Name,
		&i.Text,
		&i.IsCompleted,
		&i.Priority,
		&i.Tags,
		&i.Categories,
		&i.CreatedAt,
		&i.UpdatedAt,
	)
	return i, err
}

const deleteItem = `-- name: DeleteItem :exec
DELETE FROM items WHERE id = ?
`

func (q *Queries) DeleteItem(ctx context.Context, id string) error {
	_, err := q.db.ExecContext(ctx, deleteItem, id)
	return err
}

const getAllItems = `-- name: GetAllItems :many
SELECT id, slug, name, text, is_completed, priority, tags, categories, created_at, updated_at FROM items ORDER BY created_at DESC
`

func (q *Queries) GetAllItems(ctx context.Context) ([]Item, error) {
	rows, err := q.db.QueryContext(ctx, getAllItems)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []Item
	for rows.Next() {
		var i Item
		if err := rows.Scan(
			&i.ID,
			&i.Slug,
			&i.Name,
			&i.Text,
			&i.IsCompleted,
			&i.Priority,
			&i.Tags,
			&i.Categories,
			&i.CreatedAt,
			&i.UpdatedAt,
		); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Close(); err != nil {
		return nil, err
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}

const getItem = `-- name: GetItem :one
SELECT id, slug, name, text, is_completed, priority, tags, categories, created_at, updated_at FROM items 
WHERE slug = ? AND json_extract(categories, '$[0]') = ? LIMIT 1
`

type GetItemParams struct {
	Slug       string `json:"slug"`
	Categories string `json:"categories"`
}

func (q *Queries) GetItem(ctx context.Context, arg GetItemParams) (Item, error) {
	row := q.db.QueryRowContext(ctx, getItem, arg.Slug, arg.Categories)
	var i Item
	err := row.Scan(
		&i.ID,
		&i.Slug,
		&i.Name,
		&i.Text,
		&i.IsCompleted,
		&i.Priority,
		&i.Tags,
		&i.Categories,
		&i.CreatedAt,
		&i.UpdatedAt,
	)
	return i, err
}

const getItemByID = `-- name: GetItemByID :one
SELECT id, slug, name, text, is_completed, priority, tags, categories, created_at, updated_at FROM items WHERE id = ? LIMIT 1
`

func (q *Queries) GetItemByID(ctx context.Context, id string) (Item, error) {
	row := q.db.QueryRowContext(ctx, getItemByID, id)
	var i Item
	err := row.Scan(
		&i.ID,
		&i.Slug,
		&i.Name,
		&i.Text,
		&i.IsCompleted,
		&i.Priority,
		&i.Tags,
		&i.Categories,
		&i.CreatedAt,
		&i.UpdatedAt,
	)
	return i, err
}

const getItemTree = `-- name: GetItemTree :many
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
ORDER BY category
`

type GetItemTreeRow struct {
	Category interface{} `json:"category"`
	Items    interface{} `json:"items"`
}

func (q *Queries) GetItemTree(ctx context.Context) ([]GetItemTreeRow, error) {
	rows, err := q.db.QueryContext(ctx, getItemTree)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []GetItemTreeRow
	for rows.Next() {
		var i GetItemTreeRow
		if err := rows.Scan(&i.Category, &i.Items); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Close(); err != nil {
		return nil, err
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}

const getItemsByCategory = `-- name: GetItemsByCategory :many
SELECT id, slug, name, text, is_completed, priority, tags, categories, created_at, updated_at FROM items 
WHERE json_extract(categories, '$[0]') = ?
ORDER BY created_at DESC
`

func (q *Queries) GetItemsByCategory(ctx context.Context, categories string) ([]Item, error) {
	rows, err := q.db.QueryContext(ctx, getItemsByCategory, categories)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []Item
	for rows.Next() {
		var i Item
		if err := rows.Scan(
			&i.ID,
			&i.Slug,
			&i.Name,
			&i.Text,
			&i.IsCompleted,
			&i.Priority,
			&i.Tags,
			&i.Categories,
			&i.CreatedAt,
			&i.UpdatedAt,
		); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Close(); err != nil {
		return nil, err
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}

const updateItem = `-- name: UpdateItem :one
UPDATE items
SET 
    name = COALESCE(?2, name),
    slug = COALESCE(?3, slug),
    text = COALESCE(?4, text),
    is_completed = COALESCE(?5, is_completed),
    priority = COALESCE(?6, priority),
    tags = COALESCE(?7, tags),
    categories = COALESCE(?8, categories)
WHERE id = ?
RETURNING id, slug, name, text, is_completed, priority, tags, categories, created_at, updated_at
`

type UpdateItemParams struct {
	Name        sql.NullString `json:"name"`
	Slug        sql.NullString `json:"slug"`
	Text        sql.NullString `json:"text"`
	IsCompleted sql.NullBool   `json:"is_completed"`
	Priority    sql.NullString `json:"priority"`
	Tags        sql.NullString `json:"tags"`
	Categories  sql.NullString `json:"categories"`
	ID          string         `json:"id"`
}

func (q *Queries) UpdateItem(ctx context.Context, arg UpdateItemParams) (Item, error) {
	row := q.db.QueryRowContext(ctx, updateItem,
		arg.Name,
		arg.Slug,
		arg.Text,
		arg.IsCompleted,
		arg.Priority,
		arg.Tags,
		arg.Categories,
		arg.ID,
	)
	var i Item
	err := row.Scan(
		&i.ID,
		&i.Slug,
		&i.Name,
		&i.Text,
		&i.IsCompleted,
		&i.Priority,
		&i.Tags,
		&i.Categories,
		&i.CreatedAt,
		&i.UpdatedAt,
	)
	return i, err
}

```

## `internal/db/querier.go`
```
// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.29.0

package db

import (
	"context"
)

type Querier interface {
	CreateItem(ctx context.Context, arg CreateItemParams) (Item, error)
	DeleteItem(ctx context.Context, id string) error
	GetAllItems(ctx context.Context) ([]Item, error)
	GetItem(ctx context.Context, arg GetItemParams) (Item, error)
	GetItemByID(ctx context.Context, id string) (Item, error)
	GetItemTree(ctx context.Context) ([]GetItemTreeRow, error)
	GetItemsByCategory(ctx context.Context, categories string) ([]Item, error)
	UpdateItem(ctx context.Context, arg UpdateItemParams) (Item, error)
}

var _ Querier = (*Queries)(nil)

```

## `internal/db/models.go`
```
// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.29.0

package db

import (
	"database/sql"
	"time"
)

type Item struct {
	ID          string         `json:"id"`
	Slug        string         `json:"slug"`
	Name        string         `json:"name"`
	Text        sql.NullString `json:"text"`
	IsCompleted bool           `json:"is_completed"`
	Priority    string         `json:"priority"`
	Tags        sql.NullString `json:"tags"`
	Categories  string         `json:"categories"`
	CreatedAt   time.Time      `json:"created_at"`
	UpdatedAt   time.Time      `json:"updated_at"`
}

```

## `internal/handlers/items.go`
```
package handlers

import (
	"encoding/json"
	"errors"
	"fmt"
	"items-api/internal/common"
	"items-api/internal/storage"
	"items-api/pkg/items"
	"net/http"
	"os"

	"github.com/go-chi/chi/v5"
)

// ItemHandler holds dependencies for item handlers
type ItemHandler struct {
	Storage *storage.Service
}

// NewItemHandler creates a new handler instance
func NewItemHandler(s *storage.Service) *ItemHandler {
	return &ItemHandler{Storage: s}
}

// GetItemTree handles GET /api/items/tree
func (h *ItemHandler) GetItemTree(w http.ResponseWriter, r *http.Request) {
	tree, err := h.Storage.GetItemTree()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error getting item tree: %v\n", err)
		common.RespondWithError(w, common.NewErrorResponse("Failed to retrieve items", http.StatusInternalServerError))
		return
	}

	response := common.APIResponse{
		Success: true,
		Data:    tree,
	}
	common.RespondWithJSON(w, http.StatusOK, response)
}

// CreateItem handles POST /api/items
func (h *ItemHandler) CreateItem(w http.ResponseWriter, r *http.Request) {
	var input items.ItemInput
	if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
		common.RespondWithError(w, common.NewErrorResponse("Invalid JSON", http.StatusBadRequest))
		return
	}

	// Validate input
	if input.Name == "" {
		common.RespondWithError(w, common.NewErrorResponse("Name is required", http.StatusBadRequest))
		return
	}
	if len(input.Categories) != 1 {
		common.RespondWithError(w, common.NewErrorResponse("Exactly one category is required", http.StatusBadRequest))
		return
	}

	newItem, err := h.Storage.CreateItem(input)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error creating item: %v\n", err)
		statusCode := http.StatusInternalServerError
		if errors.Is(err, common.ErrInvalidInput) {
			statusCode = http.StatusBadRequest
		} else if errors.Is(err, common.ErrConflict) {
			statusCode = http.StatusConflict
		}
		common.RespondWithError(w, common.NewErrorResponse(err.Error(), statusCode))
		return
	}

	response := common.APIResponse{
		Success: true,
		Data:    newItem,
	}
	common.RespondWithJSON(w, http.StatusCreated, response)
}

// GetItem handles GET /api/items/{categorySlug}/{itemSlug}
func (h *ItemHandler) GetItem(w http.ResponseWriter, r *http.Request) {
	categorySlug := chi.URLParam(r, "categorySlug")
	itemSlug := chi.URLParam(r, "itemSlug")

	if categorySlug == "" || itemSlug == "" {
		common.RespondWithError(w, common.NewErrorResponse("Category slug and item slug are required", http.StatusBadRequest))
		return
	}

	item, err := h.Storage.GetItem(categorySlug, itemSlug)
	if err != nil {
		if errors.Is(err, common.ErrNotFound) {
			common.RespondWithError(w, common.NewErrorResponse("Item not found", http.StatusNotFound))
		} else {
			fmt.Fprintf(os.Stderr, "Error getting item %s/%s: %v\n", categorySlug, itemSlug, err)
			common.RespondWithError(w, common.NewErrorResponse("Failed to retrieve item", http.StatusInternalServerError))
		}
		return
	}

	response := common.APIResponse{
		Success: true,
		Data:    item,
	}
	common.RespondWithJSON(w, http.StatusOK, response)
}

// UpdateItem handles PATCH /api/items/{categorySlug}/{itemSlug}
func (h *ItemHandler) UpdateItem(w http.ResponseWriter, r *http.Request) {
	categorySlug := chi.URLParam(r, "categorySlug")
	itemSlug := chi.URLParam(r, "itemSlug")

	if categorySlug == "" || itemSlug == "" {
		common.RespondWithError(w, common.NewErrorResponse("Category slug and item slug are required", http.StatusBadRequest))
		return
	}

	var input items.ItemUpdateInput
	if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
		common.RespondWithError(w, common.NewErrorResponse("Invalid JSON", http.StatusBadRequest))
		return
	}

	updatedItem, err := h.Storage.UpdateItem(categorySlug, itemSlug, input)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error updating item %s/%s: %v\n", categorySlug, itemSlug, err)
		statusCode := http.StatusInternalServerError
		if errors.Is(err, common.ErrNotFound) {
			statusCode = http.StatusNotFound
		} else if errors.Is(err, common.ErrInvalidInput) {
			statusCode = http.StatusBadRequest
		} else if errors.Is(err, common.ErrConflict) {
			statusCode = http.StatusConflict
		}
		common.RespondWithError(w, common.NewErrorResponse(err.Error(), statusCode))
		return
	}

	response := common.APIResponse{
		Success: true,
		Data:    updatedItem,
	}
	common.RespondWithJSON(w, http.StatusOK, response)
}

// DeleteItem handles DELETE /api/items/{categorySlug}/{itemSlug}
func (h *ItemHandler) DeleteItem(w http.ResponseWriter, r *http.Request) {
	categorySlug := chi.URLParam(r, "categorySlug")
	itemSlug := chi.URLParam(r, "itemSlug")

	if categorySlug == "" || itemSlug == "" {
		common.RespondWithError(w, common.NewErrorResponse("Category slug and item slug are required", http.StatusBadRequest))
		return
	}

	err := h.Storage.DeleteItem(categorySlug, itemSlug)
	if err != nil {
		if errors.Is(err, common.ErrNotFound) {
			common.RespondWithError(w, common.NewErrorResponse("Item not found", http.StatusNotFound))
		} else {
			fmt.Fprintf(os.Stderr, "Error deleting item %s/%s: %v\n", categorySlug, itemSlug, err)
			common.RespondWithError(w, common.NewErrorResponse("Failed to delete item", http.StatusInternalServerError))
		}
		return
	}

	response := common.APIResponse{
		Success: true,
		Data:    map[string]bool{"deleted": true},
	}
	common.RespondWithJSON(w, http.StatusOK, response)
}

```

## `internal/handlers/routing.go`
```
package handlers

import (
	"items-api/internal/common"
	"net/http"

	"github.com/go-chi/chi/v5"
)

// RegisterItemRoutes sets up the routes for item management
func RegisterItemRoutes(r chi.Router, pathPrefix string, h *ItemHandler) {
	r.Route(pathPrefix, func(r chi.Router) {
		r.Get("/tree", h.GetItemTree) // GET /api/items/tree
		r.Post("/", h.CreateItem)     // POST /api/items

		// Routes with category and item slug parameters
		r.Route("/{categorySlug}/{itemSlug}", func(r chi.Router) {
			r.Get("/", h.GetItem)       // GET /api/items/{categorySlug}/{itemSlug}
			r.Patch("/", h.UpdateItem)  // PATCH /api/items/{categorySlug}/{itemSlug}
			r.Delete("/", h.DeleteItem) // DELETE /api/items/{categorySlug}/{itemSlug}
		})

		// OPTIONS handler for CORS preflight
		r.Options("/*", func(w http.ResponseWriter, r *http.Request) {
			w.WriteHeader(http.StatusOK)
		})
	})

	// Health check for this route group
	r.Get(pathPrefix+"/health", func(w http.ResponseWriter, r *http.Request) {
		common.RespondWithSuccess(w, map[string]string{"status": "OK", "type": "items"})
	})
}

```

## `internal/config/config.go`
```
package config

import (
	"fmt"
	"os"
	"path/filepath"
	"strconv"
)

const (
	defaultPort     = 3000
	defaultDataPath = "./data" // Relative to execution dir by default
	defaultDBPath   = "./data/items.db"
)

// Config holds application configuration
type Config struct {
	DataPath    string // Absolute path to store data
	DatabaseURL string // SQLite database path
	Port        string // Port string, e.g., "3000"
}

// LoadConfig loads configuration from environment variables or defaults
func LoadConfig() (*Config, error) {
	// Data Path Configuration
	dataPath := os.Getenv("ITEMS_DATA_PATH")
	if dataPath == "" {
		dataPath = defaultDataPath
		fmt.Println("INFO: ITEMS_DATA_PATH not set, using default:", dataPath)
	} else {
		fmt.Println("INFO: ITEMS_DATA_PATH set to:", dataPath)
	}

	// Ensure dataPath is absolute for consistency
	absDataPath, err := filepath.Abs(dataPath)
	if err != nil {
		return nil, fmt.Errorf("failed to resolve absolute path for data directory '%s': %w", dataPath, err)
	}
	dataPath = absDataPath

	// Ensure data path exists
	if err := os.MkdirAll(dataPath, 0755); err != nil {
		return nil, fmt.Errorf("failed to create data directory '%s': %w", dataPath, err)
	}
	fmt.Printf("INFO: Using absolute data path: %s\n", dataPath)

	// Database Configuration
	dbPath := os.Getenv("DATABASE_URL")
	if dbPath == "" {
		dbPath = defaultDBPath
		fmt.Println("INFO: DATABASE_URL not set, using default:", dbPath)
	} else {
		fmt.Println("INFO: DATABASE_URL set to:", dbPath)
	}

	// If dbPath is relative, make it absolute
	if !filepath.IsAbs(dbPath) {
		absDBPath := filepath.Join(dataPath, filepath.Base(dbPath))
		dbPath = absDBPath
	}

	// Port Configuration
	portStr := os.Getenv("ITEMS_PORT")
	port := defaultPort
	if portStr != "" {
		if p, err := strconv.Atoi(portStr); err == nil && p > 0 && p < 65536 {
			port = p
		} else {
			fmt.Printf("WARN: Invalid ITEMS_PORT value '%s', using default %d\n", portStr, defaultPort)
		}
	} else {
		fmt.Printf("INFO: ITEMS_PORT not set, using default %d\n", defaultPort)
	}
	portStr = strconv.Itoa(port)

	cfg := &Config{
		DataPath:    dataPath,
		DatabaseURL: dbPath,
		Port:        portStr,
	}

	fmt.Printf("Configuration loaded: DataPath=%s, DatabaseURL=%s, Port=%s\n", cfg.DataPath, cfg.DatabaseURL, cfg.Port)
	return cfg, nil
}

func (c *Config) GetAddr() string {
	return fmt.Sprintf(":%s", c.Port)
}

```

## `internal/database/database.go`
```
package database

import (
	"database/sql"
	"fmt"
	"os"
	"path/filepath"
	"items-api/internal/db"

	_ "modernc.org/sqlite"
)

// EnsureDBExists creates DB directory and schema if DB does not exist
func EnsureDBExists(dbPath string, schemaPath string) (bool, error) {
	dbDir := filepath.Dir(dbPath)
	if err := os.MkdirAll(dbDir, 0755); err != nil {
		return false, fmt.Errorf("failed to create DB directory: %w", err)
	}

	if _, err := os.Stat(dbPath); err == nil {
		// DB exists, no action needed
		return false, nil
	} else if !os.IsNotExist(err) {
		return false, fmt.Errorf("failed to stat DB file: %w", err)
	}

	// DB does not exist, create empty DB by opening and applying schema
	dbConn, err := sql.Open("sqlite", fmt.Sprintf("file:%s", dbPath))
	if err != nil {
		return false, fmt.Errorf("failed to open database to create schema: %w", err)
	}
	defer dbConn.Close()

	// Apply PRAGMA for faster schema apply
	pragmas := []string{
		"PRAGMA foreign_keys = ON",
		"PRAGMA journal_mode = WAL",
		"PRAGMA synchronous = OFF",
		"PRAGMA cache_size = -64000",
		"PRAGMA temp_store = MEMORY",
	}

	for _, pragma := range pragmas {
		if _, err := dbConn.Exec(pragma); err != nil {
			return false, fmt.Errorf("failed to exec pragma %s: %w", pragma, err)
		}
	}

	schema, err := os.ReadFile(schemaPath)
	if err != nil {
		return false, fmt.Errorf("failed to read schema file: %w", err)
	}
	if _, err := dbConn.Exec(string(schema)); err != nil {
		return false, fmt.Errorf("failed to apply schema: %w", err)
	}

	return true, nil
}

// Database wraps sql.DB and queries
type Database struct {
	DB      *sql.DB
	Queries *db.Queries
}

// NewDatabase opens DB and configures it for app usage
func NewDatabase(dbPath string) (*Database, error) {
	fmt.Printf("🗄️ Initializing database at: %s\n", dbPath)

	dbConn, err := sql.Open("sqlite", fmt.Sprintf("file:%s", dbPath))
	if err != nil {
		return nil, fmt.Errorf("failed to open database: %w", err)
	}

	if err := dbConn.Ping(); err != nil {
		return nil, fmt.Errorf("failed to ping database: %w", err)
	}

	pragmas := []string{
		"PRAGMA foreign_keys = ON",
		"PRAGMA journal_mode = WAL",
		"PRAGMA busy_timeout = 5000",
		"PRAGMA synchronous = NORMAL",
		"PRAGMA cache_size = -64000",
		"PRAGMA temp_store = MEMORY",
	}

	for _, pragma := range pragmas {
		if _, err := dbConn.Exec(pragma); err != nil {
			return nil, fmt.Errorf("failed to exec pragma %s: %w", pragma, err)
		}
	}

	dbConn.SetMaxOpenConns(1)
	dbConn.SetMaxIdleConns(1)

	var journalMode string
	if err := dbConn.QueryRow("PRAGMA journal_mode").Scan(&journalMode); err != nil {
		return nil, fmt.Errorf("failed to verify journal mode: %w", err)
	}
	fmt.Printf("✅ Database configured: journal_mode=%s\n", journalMode)

	queries := db.New(dbConn)

	return &Database{
		DB:      dbConn,
		Queries: queries,
	}, nil
}

func (d *Database) Close() error {
	return d.DB.Close()
}

```

## `internal/storage/service.go`
```
package storage

import (
	"errors"
	"fmt"
	"items-api/internal/common"
	"items-api/pkg/items"
	"path/filepath"
	"sort"
	"sync"
	"time"

	"github.com/google/uuid"
)

const (
	itemsBasePath = "items"
	itemFileName  = "item.yaml"
)

// Service handles storage operations for items
type Service struct {
	baseDataPath string
	mu           sync.RWMutex
}

// NewService creates a new storage service instance
func NewService(baseDataPath string) *Service {
	itemsPath := filepath.Join(baseDataPath, itemsBasePath)
	if err := common.EnsureDir(itemsPath); err != nil {
		fmt.Printf("CRITICAL: Failed to ensure items directory %s: %v\n", itemsPath, err)
	} else {
		fmt.Printf("INFO: Ensured items directory exists: %s\n", itemsPath)
	}

	return &Service{
		baseDataPath: baseDataPath,
	}
}

// Path Helpers
func (s *Service) getItemsBasePath() string {
	return filepath.Join(s.baseDataPath, itemsBasePath)
}

func (s *Service) getCategoryPath(categorySlug string) string {
	return filepath.Join(s.getItemsBasePath(), categorySlug)
}

func (s *Service) getItemFolderPath(categorySlug, itemSlug string) string {
	return filepath.Join(s.getCategoryPath(categorySlug), itemSlug)
}

func (s *Service) getItemFilePath(categorySlug, itemSlug string) string {
	return filepath.Join(s.getItemFolderPath(categorySlug, itemSlug), itemFileName)
}

// generateID creates a new unique ID
func (s *Service) generateID() string {
	return uuid.New().String()
}

// CreateItem creates a new item
func (s *Service) CreateItem(input items.ItemInput) (*items.Item, error) {
	s.mu.Lock()
	defer s.mu.Unlock()

	// Validate input
	if input.Name == "" {
		return nil, fmt.Errorf("%w: name is required", common.ErrInvalidInput)
	}
	if len(input.Categories) != 1 {
		return nil, fmt.Errorf("%w: exactly one category is required", common.ErrInvalidInput)
	}

	now := time.Now().UTC()
	id := s.generateID()
	itemSlug := common.Slugify(input.Name)
	categorySlug := common.Slugify(input.Categories[0])

	// Check if item already exists
	filePath := s.getItemFilePath(categorySlug, itemSlug)
	if err := common.ReadYAML(filePath, &struct{}{}); err == nil {
		return nil, fmt.Errorf("%w: item with name '%s' already exists in category '%s'", common.ErrConflict, input.Name, categorySlug)
	}

	// Create new item
	newItem := &items.Item{
		ID:          id,
		Slug:        itemSlug,
		Name:        input.Name,
		Text:        input.Text,
		IsCompleted: false,
		Priority:    input.Priority,
		Tags:        input.Tags,
		Categories:  []string{categorySlug}, // Store the slugified category
		CreatedAt:   now,
		UpdatedAt:   now,
	}

	// Ensure defaults
	if newItem.Tags == nil {
		newItem.Tags = []string{}
	}
	if newItem.Priority == "" {
		newItem.Priority = items.PriorityMid
	}

	// Save to file
	if err := common.WriteYAML(filePath, newItem); err != nil {
		return nil, fmt.Errorf("%w: failed to save new item: %v", common.ErrStorage, err)
	}

	return newItem, nil
}

// GetItem retrieves a single item
func (s *Service) GetItem(categorySlug, itemSlug string) (*items.Item, error) {
	s.mu.RLock()
	defer s.mu.RUnlock()

	filePath := s.getItemFilePath(categorySlug, itemSlug)
	item := &items.Item{}

	err := common.ReadYAML(filePath, item)
	if err != nil {
		if errors.Is(err, common.ErrNotFound) {
			return nil, fmt.Errorf("%w: item not found", common.ErrNotFound)
		}
		return nil, fmt.Errorf("%w: failed to read item: %v", common.ErrStorage, err)
	}

	return item, nil
}

// GetItemTree retrieves all items organized by category
func (s *Service) GetItemTree() (items.ItemTree, error) {
	s.mu.RLock()
	defer s.mu.RUnlock()

	tree := make(items.ItemTree)
	itemsBasePath := s.getItemsBasePath()

	categories, err := common.ListDirs(itemsBasePath)
	if err != nil {
		return nil, fmt.Errorf("%w: failed to list categories: %v", common.ErrStorage, err)
	}

	for _, categorySlug := range categories {
		categoryPath := s.getCategoryPath(categorySlug)
		itemSlugs, err := common.ListDirs(categoryPath)
		if err != nil {
			fmt.Printf("WARN: Failed to list items in category %s: %v\n", categorySlug, err)
			continue
		}

		var categoryItems []items.Item
		for _, itemSlug := range itemSlugs {
			item, err := s.getItemInternal(categorySlug, itemSlug)
			if err != nil {
				fmt.Printf("WARN: Failed to read item %s/%s: %v\n", categorySlug, itemSlug, err)
				continue
			}
			categoryItems = append(categoryItems, *item)
		}

		// Sort items by creation date, newest first
		sort.Slice(categoryItems, func(i, j int) bool {
			return categoryItems[i].CreatedAt.After(categoryItems[j].CreatedAt)
		})

		if len(categoryItems) > 0 {
			tree[categorySlug] = categoryItems
		}
	}

	return tree, nil
}

// UpdateItem updates an existing item
func (s *Service) UpdateItem(categorySlug, itemSlug string, input items.ItemUpdateInput) (*items.Item, error) {
	s.mu.Lock()
	defer s.mu.Unlock()

	// Read existing item
	existingItem, err := s.getItemInternal(categorySlug, itemSlug)
	if err != nil {
		return nil, err
	}

	// Apply updates
	updated := false
	newCategorySlug := categorySlug
	newItemSlug := itemSlug

	if input.Name != nil && *input.Name != existingItem.Name {
		existingItem.Name = *input.Name
		newItemSlug = common.Slugify(*input.Name)
		updated = true
	}
	if input.Text != nil && *input.Text != existingItem.Text {
		existingItem.Text = *input.Text
		updated = true
	}
	if input.Priority != nil && *input.Priority != existingItem.Priority {
		existingItem.Priority = *input.Priority
		updated = true
	}
	if input.IsCompleted != nil && *input.IsCompleted != existingItem.IsCompleted {
		existingItem.IsCompleted = *input.IsCompleted
		updated = true
	}
	if input.Tags != nil {
		existingItem.Tags = input.Tags
		updated = true
	}
	if input.Categories != nil {
		if len(input.Categories) != 1 {
			return nil, fmt.Errorf("%w: exactly one category is required", common.ErrInvalidInput)
		}
		newCategorySlug = common.Slugify(input.Categories[0])
		if newCategorySlug != categorySlug {
			existingItem.Categories = []string{newCategorySlug}
			updated = true
		}
	}

	if !updated {
		return existingItem, nil
	}

	// Update timestamp
	existingItem.UpdatedAt = time.Now().UTC()
	existingItem.Slug = newItemSlug

	// Handle potential move (category or name change)
	oldPath := s.getItemFolderPath(categorySlug, itemSlug)
	newPath := s.getItemFolderPath(newCategorySlug, newItemSlug)

	if oldPath != newPath {
		// Check for conflicts at new location
		newFilePath := s.getItemFilePath(newCategorySlug, newItemSlug)
		existingFile := &items.Item{}
		if err := common.ReadYAML(newFilePath, existingFile); err == nil {
			if existingFile.ID != existingItem.ID {
				return nil, fmt.Errorf("%w: target location already occupied by different item", common.ErrConflict)
			}
		}

		// Save to new location
		if err := common.WriteYAML(newFilePath, existingItem); err != nil {
			return nil, fmt.Errorf("%w: failed to save item to new location: %v", common.ErrStorage, err)
		}

		// Remove old location
		if err := common.RemoveDir(oldPath); err != nil {
			fmt.Printf("WARN: Failed to remove old item folder %s: %v\n", oldPath, err)
		}
	} else {
		// Same location, just update
		filePath := s.getItemFilePath(categorySlug, itemSlug)
		if err := common.WriteYAML(filePath, existingItem); err != nil {
			return nil, fmt.Errorf("%w: failed to save updated item: %v", common.ErrStorage, err)
		}
	}

	return existingItem, nil
}

// DeleteItem removes an item
func (s *Service) DeleteItem(categorySlug, itemSlug string) error {
	s.mu.Lock()
	defer s.mu.Unlock()

	// Verify item exists first
	if _, err := s.getItemInternal(categorySlug, itemSlug); err != nil {
		return err
	}

	// Remove the item folder
	itemPath := s.getItemFolderPath(categorySlug, itemSlug)
	if err := common.RemoveDir(itemPath); err != nil {
		return fmt.Errorf("%w: failed to delete item: %v", common.ErrStorage, err)
	}

	return nil
}

// Internal helper that doesn't acquire lock
func (s *Service) getItemInternal(categorySlug, itemSlug string) (*items.Item, error) {
	filePath := s.getItemFilePath(categorySlug, itemSlug)
	item := &items.Item{}

	err := common.ReadYAML(filePath, item)
	if err != nil {
		if errors.Is(err, common.ErrNotFound) {
			return nil, fmt.Errorf("%w: item not found", common.ErrNotFound)
		}
		return nil, fmt.Errorf("%w: failed to read item: %v", common.ErrStorage, err)
	}

	return item, nil
}

```

## `internal/api/handlers.go`
```
package api

import (
	"context"
	"items-api/internal/services"
	"items-api/pkg/items"
	"net/http"

	"github.com/danielgtaylor/huma/v2"
	"github.com/go-chi/chi/v5"
)

// API response structures
type APIResponse struct {
	Success bool        `json:"success"`
	Data    interface{} `json:"data,omitempty"`
	Error   *string     `json:"error,omitempty"`
}

type ItemTreeResponse struct {
	Body struct {
		Success bool           `json:"success"`
		Data    items.ItemTree `json:"data"`
	}
}

type ItemResponse struct {
	Body struct {
		Success bool       `json:"success"`
		Data    items.Item `json:"data"`
	}
}

type DeleteResponse struct {
	Body struct {
		Success bool `json:"success"`
		Data    struct {
			Deleted bool `json:"deleted"`
		} `json:"data"`
	}
}

// ItemHandler holds dependencies for item handlers
type ItemHandler struct {
	itemService *services.ItemService
}

func NewItemHandler(itemService *services.ItemService) *ItemHandler {
	return &ItemHandler{
		itemService: itemService,
	}
}

// RegisterRoutes registers all API routes
func (h *ItemHandler) RegisterRoutes(api huma.API, r chi.Router) {
	// GET /api/items/tree - Get all items grouped by category
	huma.Register(api, huma.Operation{
		OperationID: "getItemTree",
		Method:      http.MethodGet,
		Path:        "/api/items/tree",
		Summary:     "Get item tree",
		Description: "Retrieve all items organized by category",
		Tags:        []string{"items"},
	}, func(ctx context.Context, input *struct{}) (*ItemTreeResponse, error) {
		tree, err := h.itemService.GetItemTree()
		if err != nil {
			return nil, huma.Error500InternalServerError("Failed to retrieve items")
		}

		resp := &ItemTreeResponse{}
		resp.Body.Success = true
		resp.Body.Data = tree
		return resp, nil
	})

	// POST /api/items - Create a new item
	huma.Register(api, huma.Operation{
		OperationID: "createItem",
		Method:      http.MethodPost,
		Path:        "/api/items",
		Summary:     "Create item",
		Description: "Create a new item",
		Tags:        []string{"items"},
	}, func(ctx context.Context, input *struct {
		Body *items.ItemInput
	}) (*ItemResponse, error) {
		if input.Body.Name == "" {
			return nil, huma.Error400BadRequest("Name is required")
		}
		if len(input.Body.Categories) != 1 {
			return nil, huma.Error400BadRequest("Exactly one category is required")
		}

		newItem, err := h.itemService.CreateItem(*input.Body)
		if err != nil {
			if err.Error() == "name is required" || err.Error() == "exactly one category is required" {
				return nil, huma.Error400BadRequest(err.Error())
			}
			if contains(err.Error(), "already exists") {
				return nil, huma.Error409Conflict(err.Error())
			}
			return nil, huma.Error500InternalServerError("Failed to create item")
		}

		resp := &ItemResponse{}
		resp.Body.Success = true
		resp.Body.Data = *newItem
		return resp, nil
	})

	// GET /api/items/{categorySlug}/{itemSlug} - Get a specific item
	huma.Register(api, huma.Operation{
		OperationID: "getItem",
		Method:      http.MethodGet,
		Path:        "/api/items/{categorySlug}/{itemSlug}",
		Summary:     "Get item",
		Description: "Retrieve a specific item by category and slug",
		Tags:        []string{"items"},
	}, func(ctx context.Context, input *struct {
		CategorySlug string `path:"categorySlug"`
		ItemSlug     string `path:"itemSlug"`
	}) (*ItemResponse, error) {
		if input.CategorySlug == "" || input.ItemSlug == "" {
			return nil, huma.Error400BadRequest("Category slug and item slug are required")
		}

		item, err := h.itemService.GetItem(input.CategorySlug, input.ItemSlug)
		if err != nil {
			if contains(err.Error(), "not found") {
				return nil, huma.Error404NotFound("Item not found")
			}
			return nil, huma.Error500InternalServerError("Failed to retrieve item")
		}

		resp := &ItemResponse{}
		resp.Body.Success = true
		resp.Body.Data = *item
		return resp, nil
	})

	// PATCH /api/items/{categorySlug}/{itemSlug} - Update an item
	huma.Register(api, huma.Operation{
		OperationID: "updateItem",
		Method:      http.MethodPatch,
		Path:        "/api/items/{categorySlug}/{itemSlug}",
		Summary:     "Update item",
		Description: "Update an existing item",
		Tags:        []string{"items"},
	}, func(ctx context.Context, input *struct {
		CategorySlug string `path:"categorySlug"`
		ItemSlug     string `path:"itemSlug"`
		Body         *items.ItemUpdateInput
	}) (*ItemResponse, error) {
		if input.CategorySlug == "" || input.ItemSlug == "" {
			return nil, huma.Error400BadRequest("Category slug and item slug are required")
		}

		updatedItem, err := h.itemService.UpdateItem(input.CategorySlug, input.ItemSlug, *input.Body)
		if err != nil {
			if contains(err.Error(), "not found") {
				return nil, huma.Error404NotFound("Item not found")
			}
			if contains(err.Error(), "required") {
				return nil, huma.Error400BadRequest(err.Error())
			}
			if contains(err.Error(), "occupied") {
				return nil, huma.Error409Conflict(err.Error())
			}
			return nil, huma.Error500InternalServerError("Failed to update item")
		}

		resp := &ItemResponse{}
		resp.Body.Success = true
		resp.Body.Data = *updatedItem
		return resp, nil
	})

	// DELETE /api/items/{categorySlug}/{itemSlug} - Delete an item
	huma.Register(api, huma.Operation{
		OperationID: "deleteItem",
		Method:      http.MethodDelete,
		Path:        "/api/items/{categorySlug}/{itemSlug}",
		Summary:     "Delete item",
		Description: "Delete an item",
		Tags:        []string{"items"},
	}, func(ctx context.Context, input *struct {
		CategorySlug string `path:"categorySlug"`
		ItemSlug     string `path:"itemSlug"`
	}) (*DeleteResponse, error) {
		if input.CategorySlug == "" || input.ItemSlug == "" {
			return nil, huma.Error400BadRequest("Category slug and item slug are required")
		}

		err := h.itemService.DeleteItem(input.CategorySlug, input.ItemSlug)
		if err != nil {
			if contains(err.Error(), "not found") {
				return nil, huma.Error404NotFound("Item not found")
			}
			return nil, huma.Error500InternalServerError("Failed to delete item")
		}

		resp := &DeleteResponse{}
		resp.Body.Success = true
		resp.Body.Data.Deleted = true
		return resp, nil
	})
}

// Helper function to check if string contains substring
func contains(s, substr string) bool {
	return len(s) >= len(substr) && (s == substr || len(substr) == 0 ||
		(len(s) > len(substr) && (s[:len(substr)] == substr || s[len(s)-len(substr):] == substr ||
			func() bool {
				for i := 0; i <= len(s)-len(substr); i++ {
					if s[i:i+len(substr)] == substr {
						return true
					}
				}
				return false
			}())))
}

```

## `internal/api/info.go`
```
package api

import (
	"encoding/json"
	"items-api/internal/config"
	"net/http"
	"time"
)

type InfoResponse struct {
	Service     string            `json:"service"`
	Version     string            `json:"version"`
	Description string            `json:"description"`
	Endpoints   map[string]string `json:"endpoints"`
	Environment map[string]string `json:"environment"`
	Uptime      string            `json:"uptime"`
	Docs        string            `json:"docs"`
}

func GetInfo(cfg *config.Config, startTime time.Time) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		info := InfoResponse{
			Service:     "items-crud-api",
			Version:     "1.0.0",
			Description: "Items CRUD API with SQLite, Huma, Chi, and sqlc",
			Endpoints: map[string]string{
				"docs":        "/docs",
				"openapi":     "/openapi.json",
				"health":      "/health",
				"items_tree":  "/api/items/tree",
				"items":       "/api/items",
				"item_detail": "/api/items/{categorySlug}/{itemSlug}",
			},
			Environment: map[string]string{
				"data_path":    cfg.DataPath,
				"database_url": cfg.DatabaseURL,
				"port":         cfg.Port,
			},
			Uptime: time.Since(startTime).String(),
			Docs:   "/docs",
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(info)
	}
}

```

## `go.mod`
```
module items-api

go 1.25.0

require (
	github.com/danielgtaylor/huma/v2 v2.34.1
	github.com/go-chi/chi/v5 v5.2.3
	github.com/go-chi/cors v1.2.2
	github.com/google/uuid v1.6.0
	gopkg.in/yaml.v3 v3.0.1
	modernc.org/sqlite v1.40.0
)

require (
	github.com/dustin/go-humanize v1.0.1 // indirect
	github.com/mattn/go-isatty v0.0.20 // indirect
	github.com/ncruces/go-strftime v0.1.9 // indirect
	github.com/remyoudompheng/bigfft v0.0.0-20230129092748-24d4a6f8daec // indirect
	golang.org/x/exp v0.0.0-20250620022241-b7579e27df2b // indirect
	golang.org/x/sys v0.36.0 // indirect
	modernc.org/libc v1.66.10 // indirect
	modernc.org/mathutil v1.7.1 // indirect
	modernc.org/memory v1.11.0 // indirect
)

```

## `.air.toml`
```
# .air.toml
root = "."
tmp_dir = "tmp"

[build]
  cmd = "go build -o ./tmp/main ./cmd/server"
  bin = "./tmp/main"
  include_ext = ["go", "sql"]
  exclude_dir = ["assets", "tmp", "vendor", "frontend", "data"]
  log = "air-build-errors.log"
  delay = 500

[log]
  time = true

[misc]
  clean_on_exit = true

```

