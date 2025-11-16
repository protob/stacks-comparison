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
