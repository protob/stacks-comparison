package database

import (
	"database/sql"
	"fmt"
	"items-api/internal/db"
	"log"

	_ "modernc.org/sqlite"
)

type Database struct {
	DB      *sql.DB
	Queries *db.Queries
}

func NewDatabase(dbPath string) (*Database, error) {
	// Open database connection
	dbConn, err := sql.Open("sqlite", dbPath)
	if err != nil {
		return nil, fmt.Errorf("failed to open database: %w", err)
	}

	// Test connection
	if err := dbConn.Ping(); err != nil {
		return nil, fmt.Errorf("failed to ping database: %w", err)
	}

	// Enable foreign key support
	if _, err := dbConn.Exec("PRAGMA foreign_keys = ON"); err != nil {
		return nil, fmt.Errorf("failed to enable foreign keys: %w", err)
	}

	// Enable WAL mode for better concurrency
	if _, err := dbConn.Exec("PRAGMA journal_mode = WAL"); err != nil {
		log.Printf("Warning: failed to enable WAL mode: %v", err)
	}

	queries := db.New(dbConn)

	return &Database{
		DB:      dbConn,
		Queries: queries,
	}, nil
}

func (d *Database) Close() error {
	return d.DB.Close()
}
