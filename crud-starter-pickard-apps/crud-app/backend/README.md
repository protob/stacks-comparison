# Items API

A REST API for managing items, built with Go and Chi router.

- **Data Storage:** YAML files in `./data/items/[category]/[item-slug]/item.yaml`
- **Framework:** Uses `chi/v5` router
- **CORS:** Configured to allow all origins (adjust in production)

Run
```sh
go run ./cmd/server/main.go
```

## Endpoints

- `GET    /api/health` : Health check
- `GET    /api/items/tree` : Get all items organized by category
- `POST   /api/items` : Create a new item
- `GET    /api/items/{categorySlug}/{itemSlug}` : Get a specific item
- `PATCH  /api/items/{categorySlug}/{itemSlug}` : Update an item
- `DELETE /api/items/{categorySlug}/{itemSlug}` : Delete an item

## Data Structure

Items are stored with the following structure:
```yaml
id: "uuid-string"
slug: "item-slug"
name: "Item Name"
text: "Item description"
isCompleted: false
priority: "mid" # low, mid, high
tags: ["tag1", "tag2"]
categories: ["category-slug"]
createdAt: "2023-01-01T00:00:00Z"
updatedAt: "2023-01-01T00:00:00Z"
```

## Running

1. Install Go 1.21+
2. Navigate to the `items-api` directory: `cd items-api`
3. Run tidy: `go mod tidy`
4. Run the server: `go run ./cmd/server/main.go`
   - Or build a binary: `go build -o items-api ./cmd/server` and then run `./items-api`

## Configuration (Environment Variables)

- `ITEMS_PORT`: Port to run the API on (default: `3000`)
- `ITEMS_DATA_PATH`: Path to the data directory (default: `./data` relative to execution)

## Example API Usage

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

### Get all items
```bash
curl http://localhost:3000/api/items/tree
```

### Update an item
```bash
curl -X PATCH http://localhost:3000/api/items/personal/buy-groceries \
  -H "Content-Type: application/json" \
  -d '{
    "isCompleted": true
  }'
```

## Run dev server
Run
```sh
go run ./cmd/server/main.go
```


## Production Build

To create a single, self-contained executable binary for deployment:

```bash
cd items-api
CGO_ENABLED=0 go build -ldflags="-w -s" -o items-api ./cmd/server
```

This command creates a static binary with:

- `CGO_ENABLED=0`: Ensures no system C libraries dependencies for portability
- `-ldflags="-w -s"`: Reduces binary size by stripping debug information
- Produces a single executable file named `items-api`