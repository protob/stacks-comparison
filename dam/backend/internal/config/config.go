package config

import (
	"fmt"
	"os"
	"path/filepath"
)

const (
	defaultPort       = "3000"
	defaultDataPath   = "./data"
	defaultAssetsPath = "/run/media/dtb/DATA/dam-assets"
)

type Config struct {
	Port            string
	DataPath        string  // Database and metadata
	AssetsPath      string  // Audio files from Suno/Udio (NEVER modified)
	DebugScanLimit  bool    // If true, only scan first folder found (for debugging)
}

func LoadConfig() (*Config, error) {
	port := os.Getenv("API_PORT")
	if port == "" {
		port = defaultPort
	}

	dataPath := os.Getenv("DATA_PATH")
	if dataPath == "" {
		dataPath = defaultDataPath
	}

	// NEW: Assets path (Suno/Udio files)
	assetsPath := os.Getenv("ASSETS_PATH")
	if assetsPath == "" {
		assetsPath = defaultAssetsPath
	}

	absDataPath, err := filepath.Abs(dataPath)
	if err != nil {
		return nil, fmt.Errorf("failed to resolve absolute path for data: %w", err)
	}

	absAssetsPath, err := filepath.Abs(assetsPath)
	if err != nil {
		return nil, fmt.Errorf("failed to resolve absolute path for assets: %w", err)
	}

	// Create data directory (database)
	if err := os.MkdirAll(absDataPath, 0755); err != nil {
		return nil, fmt.Errorf("failed to create data directory: %w", err)
	}

	// Verify assets path exists (don't create - should already exist)
	if _, err := os.Stat(absAssetsPath); os.IsNotExist(err) {
		return nil, fmt.Errorf("assets path does not exist: %s (expected Suno/Udio files here)", absAssetsPath)
	}

	// ===== DEBUG FLAG: Change this manually to enable/disable scan limits =====
	const debugScanLimit = false // Set to true to only scan first folder
	// ===========================================================================

	cfg := &Config{
		Port:           port,
		DataPath:       absDataPath,
		AssetsPath:     absAssetsPath,
		DebugScanLimit: debugScanLimit,
	}

	fmt.Printf("✅ Config loaded:\n")
	fmt.Printf("   Port=%s\n", cfg.Port)
	fmt.Printf("   DataPath=%s (database)\n", cfg.DataPath)
	fmt.Printf("   AssetsPath=%s (audio files)\n", cfg.AssetsPath)
	if debugScanLimit {
		fmt.Printf("   ⚠️  DEBUG_SCAN_LIMIT=true (only first folder will be scanned)\n")
	}
	return cfg, nil
}
