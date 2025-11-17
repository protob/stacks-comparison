#!/bin/bash
# Automatically generate sqlc code if it doesn't exist

set -e

# Check if internal/db directory exists and has generated files
if [ ! -f "internal/db/items.sql.go" ]; then
    echo "⚠️  Generated sqlc code not found!"
    echo "🔧 Running: sqlc generate"

    # Check if sqlc is installed
    if ! command -v sqlc &> /dev/null; then
        echo "❌ ERROR: sqlc is not installed"
        echo "📦 Install it with: go install github.com/sqlc-dev/sqlc/cmd/sqlc@latest"
        exit 1
    fi

    # Generate the code
    sqlc generate

    echo "✅ sqlc code generated successfully!"
else
    echo "✅ sqlc generated code already exists"
fi
