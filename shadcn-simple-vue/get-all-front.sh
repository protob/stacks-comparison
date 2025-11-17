#!/bin/bash
set -euo pipefail

# Consolidates frontend source files only into a single markdown file

ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"
FRONTEND_DIR="$ROOT_DIR/shadcn-simple-nuxt"
OUTPUT_DIR="$ROOT_DIR/z_sources"
OUTPUT_FILE="$OUTPUT_DIR/shadcn-simple-nuxt.md"

# Directories to exclude (these won't be descended into at all)
EXCLUDES=("node_modules" ".git" "dist" "build" ".output" ".nuxt" ".cache" "public" ".vite")

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
        # Frontend files (Vue, JS, TS, Styles)
        *.vue|*.ts|*.js|*.html|*.css|*.scss|*.sass)
            return 0
            ;;
        # Configuration and documentation files
        *.json|*.md|*.yml|*.yaml|*.toml|*.mjs|*.cjs)
            return 0
            ;;
        # Shell scripts
        *.sh)
            return 0
            ;;
        # Other config files
        .editorconfig|.gitignore)
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
        if [[ "$file" == *"/$dir/"* ]] || [[ "$file" == "$FRONTEND_DIR/$dir"* ]]; then
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
        "bun.lock"|"bun.lockb"|"package-lock.json"|"yarn.lock")
            return 0
            ;;
        # Binary/media/asset files
        *.ico|*.png|*.jpg|*.jpeg|*.gif|*.svg|*.pdf|*.webmanifest)
            return 0
            ;;
        # Log and temporary files
        *.log|*.tmp|*.swp|*.backup)
            return 0
            ;;
        # Environment files (contain secrets)
        ".env"|".env."*)
            return 0
            ;;
        # This script
        "get-all-front.sh")
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
echo "=== Frontend Source Code Consolidator ==="
echo "Frontend directory: $FRONTEND_DIR"
echo ""

# Check if frontend directory exists
if [ ! -d "$FRONTEND_DIR" ]; then
    echo "❌ Error: Frontend directory not found at $FRONTEND_DIR"
    exit 1
fi

# Prepare the output directory and file
echo "Creating output directory: $OUTPUT_DIR"
mkdir -p "$OUTPUT_DIR"

# Add a header to the final markdown file
cat > "$OUTPUT_FILE" << EOF
# Frontend Source Code Collection (crud-app-sqlite)

**Generated on:** $(date)
**Frontend directory:** $FRONTEND_DIR

---

EOF

# Start finding and processing files
echo "Starting file processing..."

# Use 'find' to get all files, excluding entire directories for performance
find "$FRONTEND_DIR" -type f \
    ! -path "*/node_modules/*" \
    ! -path "*/.git/*" \
    ! -path "*/dist/*" \
    ! -path "*/build/*" \
    ! -path "*/.output/*" \
    ! -path "*/.nuxt/*" \
    ! -path "*/.cache/*" \
    ! -path "*/public/*" \
    ! -path "*/.vite/*" \
    -print0 | while IFS= read -r -d '' file; do
    process_file "$file" "$OUTPUT_FILE" "$FRONTEND_DIR"
done

echo ""
echo "✅ Processing complete!"
echo "   Output file: $OUTPUT_FILE"
echo "   File size: $(du -h "$OUTPUT_FILE" | cut -f1)"
echo ""
