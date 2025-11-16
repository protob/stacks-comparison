#!/bin/bash
set -euo pipefail

# Consolidates all relevant project source files into a single markdown file
# Handles full-stack projects with backend (Go) and frontend (Vue/TypeScript)

ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"
OUTPUT_DIR="$ROOT_DIR/z_sources"
OUTPUT_FILE="$OUTPUT_DIR/all_project_sources.md"

# Directories to exclude (these won't be descended into at all)
EXCLUDES=("node_modules" ".git" "dist" "build" ".output" ".nuxt" ".cache" "z_sources" "0_notes" "public" ".vite" "tmp" "vendor" "data")

# Function to check if a file is binary
is_binary() {
    local file="$1"
    if file -b --mime-encoding "$file" 2>/dev/null | grep -qE '^binary$'; then
        return 0
    fi
    return 1
}

# Function to check if file should be included based on extension
is_included() {
    local file="$1"
    case "$file" in
        # Backend files (Go)
        *.go)
            return 0
            ;;
        # Frontend files (Vue, JS, TS, Styles)
        *.vue|*.ts|*.js|*.html|*.css|*.scss|*.sass)
            return 0
            ;;
        # SQL files
        *.sql)
            return 0
            ;;
        # Configuration and documentation files
        *.json|*.md|*.yml|*.yaml|*.toml|*.mjs|*.cjs|*.mod)
            return 0
            ;;
        # Shell scripts
        *.sh)
            return 0
            ;;
        # Other config files
        .editorconfig|.air.toml|.gitignore|.gitattributes)
            return 0
            ;;
        *)
            return 1
            ;;
    esac
}

# Function to check if a file is within an excluded directory
is_excluded_dir() {
    local file="$1"
    for dir in "${EXCLUDES[@]}"; do
        if [[ "$file" == *"/$dir/"* ]] || [[ "$file" == "$ROOT_DIR/$dir"* ]]; then
            return 0
        fi
    done
    return 1
}

# Function to check if specific file should be skipped
should_skip_file() {
    local file="$1"
    local basename=$(basename "$file")

    case "$basename" in
        # Auto-generated type definitions
        "auto-imports.d.ts"|"components.d.ts"|"env.d.ts")
            return 0
            ;;
        # Lock files
        "bun.lock"|"bun.lockb"|"package-lock.json"|"yarn.lock"|"go.sum")
            return 0
            ;;
        # Binary/media/asset files
        *.ico|*.png|*.jpg|*.jpeg|*.gif|*.svg|*.pdf|*.webmanifest)
            return 0
            ;;
        # Database files
        *.db|*.db-journal|*.db-shm|*.db-wal)
            return 0
            ;;
        # Compiled binaries
        "main"|"items-api")
            return 0
            ;;
        # Log and temporary files
        *.log|*.tmp|*.swp|*.pyc|*.backup|"air-build-errors.log")
            return 0
            ;;
        # Environment files (contain secrets)
        ".env"|".env."*)
            return 0
            ;;
        # These scripts
        "get-all.sh"|"get-all-front.sh"|"get-all-back.sh")
            return 0
            ;;
        # System files
        ".DS_Store"|"Thumbs.db")
            return 0
            ;;
        *)
            return 1
            ;;
    esac
}

# Function to process a single file
process_file() {
    local file="$1"
    local output_file="$2"
    local base_path="$3"
    local relative_path="${file#$base_path/}"

    # Skip if it's in an excluded directory
    if is_excluded_dir "$file"; then
        return
    fi

    # Skip based on specific file name patterns
    if should_skip_file "$file"; then
        echo "Skipping file by name: $relative_path"
        return
    fi

    # Skip if it's not an included file type
    if ! is_included "$file"; then
        echo "Skipping by type: $relative_path"
        return
    fi

    # Final check for binary files that may have slipped through
    if is_binary "$file"; then
        echo "Skipping binary file: $relative_path"
        return
    fi

    echo "Processing: $relative_path"

    # Append the file path and its content to the output markdown file
    echo "## \`$relative_path\`" >> "$output_file"
    echo '```' >> "$output_file"
    cat "$file" >> "$output_file"
    echo -e '\n```\n' >> "$output_file"
}

# Main execution
echo "=== Project Source Code Consolidator (crud-app-sqlite) ==="
echo "Root directory: $ROOT_DIR"
echo ""

# Prepare the output directory and file
echo "Creating output directory: $OUTPUT_DIR"
rm -rf "$OUTPUT_DIR"
mkdir -p "$OUTPUT_DIR"

# Add a header to the final markdown file
cat > "$OUTPUT_FILE" << EOF
# Project Source Code Collection (crud-app-sqlite)

**Generated on:** $(date)
**Root directory:** $ROOT_DIR
**Tech Stack:** Go, SQLite, Huma, Chi, sqlc, Air (Backend) + Frontend

---

EOF

# Start finding and processing files
echo "Starting file processing..."

# Use 'find' to get all files, excluding entire directories for performance
find "$ROOT_DIR" -type f \
    ! -path "*/node_modules/*" \
    ! -path "*/.git/*" \
    ! -path "*/dist/*" \
    ! -path "*/build/*" \
    ! -path "*/.output/*" \
    ! -path "*/.nuxt/*" \
    ! -path "*/.cache/*" \
    ! -path "*/z_sources/*" \
    ! -path "*/0_notes/*" \
    ! -path "*/public/*" \
    ! -path "*/.vite/*" \
    ! -path "*/tmp/*" \
    ! -path "*/vendor/*" \
    ! -path "*/data/*" \
    -print0 | while IFS= read -r -d '' file; do
    process_file "$file" "$OUTPUT_FILE" "$ROOT_DIR"
done

echo ""
echo "✅ Processing complete!"
echo "   Output file: $OUTPUT_FILE"
echo "   File size: $(du -h "$OUTPUT_FILE" | cut -f1)"
echo ""
