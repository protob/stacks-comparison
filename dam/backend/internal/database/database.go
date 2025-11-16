package database

import (
	"database/sql"
	"fmt"
	"os"
	"path/filepath"

	_ "modernc.org/sqlite"
)

func New(dataPath string) (*sql.DB, error) {
	dbPath := filepath.Join(dataPath, "dam.db")
	fmt.Printf("🗄️ Initializing database at: %s\n", dbPath)

	// Open database with foreign key support
	db, err := sql.Open("sqlite", fmt.Sprintf("file:%s", dbPath))
	if err != nil {
		return nil, fmt.Errorf("failed to open database: %w", err)
	}

	if err := db.Ping(); err != nil {
		return nil, fmt.Errorf("failed to connect to database: %w", err)
	}

	// Configure database settings via PRAGMA statements
	// This is more reliable than connection string parameters
	pragmas := []string{
		"PRAGMA foreign_keys = ON",
		"PRAGMA journal_mode = WAL",          // Enable Write-Ahead Logging for concurrent writes
		"PRAGMA busy_timeout = 5000",         // Wait up to 5 seconds on lock
		"PRAGMA synchronous = NORMAL",        // Balance between safety and speed
		"PRAGMA cache_size = -64000",         // 64MB cache
		"PRAGMA temp_store = MEMORY",         // Keep temp tables in memory
	}

	for _, pragma := range pragmas {
		if _, err := db.Exec(pragma); err != nil {
			return nil, fmt.Errorf("failed to execute %s: %w", pragma, err)
		}
	}

	// Set connection pool limits for concurrent operations
	// SQLite is single-writer, so limit to 1 connection for writes
	// This completely eliminates SQLITE_BUSY errors
	db.SetMaxOpenConns(1)
	db.SetMaxIdleConns(1)

	// Verify WAL mode is enabled
	var journalMode string
	if err := db.QueryRow("PRAGMA journal_mode").Scan(&journalMode); err != nil {
		return nil, fmt.Errorf("failed to verify journal mode: %w", err)
	}

	fmt.Printf("✅ Database configured: journal_mode=%s\n", journalMode)

	return db, nil
}

func ApplySchema(db *sql.DB, schemaPath string) error {
	schema, err := os.ReadFile(schemaPath)
	if err != nil {
		return fmt.Errorf("failed to read schema file: %w", err)
	}
	_, err = db.Exec(string(schema))
	if err != nil {
		return fmt.Errorf("failed to apply schema: %w", err)
	}
	fmt.Println("✅ Database schema applied successfully.")
	return nil
}