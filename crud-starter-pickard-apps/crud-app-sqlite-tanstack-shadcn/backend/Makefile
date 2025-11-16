.PHONY: help setup generate run build clean dev

help: ## Show this help message
	@echo "Available commands:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2}'

setup: ## Install dependencies and generate code
	@echo "📦 Installing Go dependencies..."
	go mod download
	@echo "✨ Generating sqlc code..."
	sqlc generate
	@echo "✅ Setup complete!"

generate: ## Generate sqlc code from SQL queries
	@echo "✨ Generating sqlc code..."
	sqlc generate
	@echo "✅ Generated code updated in internal/db/"

run: generate ## Generate code and run the server
	@echo "🚀 Starting server..."
	go run ./cmd/server/main.go

dev: generate ## Generate code and run with hot reload
	@echo "🔥 Starting with hot reload..."
	air

build: generate ## Generate code and build production binary
	@echo "🏗️  Building production binary..."
	go build -ldflags="-w -s" -o bin/items-api ./cmd/server
	@echo "✅ Binary created at bin/items-api"

clean: ## Clean generated files and build artifacts
	@echo "🧹 Cleaning up..."
	rm -rf bin/
	rm -rf tmp/
	rm -f items-api
	@echo "✅ Cleaned!"

.DEFAULT_GOAL := help
