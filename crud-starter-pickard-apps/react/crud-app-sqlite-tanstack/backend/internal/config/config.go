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
