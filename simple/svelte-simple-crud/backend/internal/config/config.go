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
)

// Config holds application configuration
type Config struct {
	DataPath string // Absolute path to store YAML data
	Port     string // Port string, e.g., "3000"
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

	// Ensure data path and items sub-directory exist
	itemsPath := filepath.Join(dataPath, "items")
	if err := os.MkdirAll(itemsPath, 0755); err != nil {
		return nil, fmt.Errorf("failed to create items directory '%s': %w", itemsPath, err)
	}
	fmt.Printf("INFO: Using absolute data path: %s\n", dataPath)

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
		DataPath: dataPath,
		Port:     portStr,
	}

	fmt.Printf("Configuration loaded: DataPath=%s, Port=%s\n", cfg.DataPath, cfg.Port)
	return cfg, nil
}
