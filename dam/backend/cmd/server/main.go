package main

import (
	"context"
	"dam-backend/internal/api"
	"dam-backend/internal/config"
	"dam-backend/internal/database"
	"dam-backend/internal/db"
	"dam-backend/internal/services"
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
)

func main() {
	startTime := time.Now()
	cfg, err := config.LoadConfig()
	if err != nil {
		log.Fatalf("FATAL: Could not load config: %v", err)
	}

	sqlDB, err := database.New(cfg.DataPath)
	if err != nil {
		log.Fatalf("FATAL: Could not initialize database: %v", err)
	}
	defer sqlDB.Close()

	fmt.Println("✅ Database connected successfully")

	// Apply schema to ensure all tables exist
	if err := database.ApplySchema(sqlDB, "db/schema.sql"); err != nil {
		log.Fatalf("FATAL: Could not apply database schema: %v", err)
	}

	querier := db.New(sqlDB)

	// Initialize Services
	scannerService := services.NewScannerService(cfg, querier)
	collectionService := services.NewCollectionService(querier)
	projectService := services.NewProjectService(querier)
	ideaService := services.NewIdeaService(querier)
	songService := services.NewSongService(querier)
	trackService := services.NewTrackService(cfg, querier)
	workspaceService := services.NewWorkspaceService(cfg)
	downloadService := services.NewDownloadService(querier, collectionService, projectService, ideaService, songService, trackService)

	// Ensure default collection exists
	if _, err := collectionService.EnsureDefaultCollection(context.Background()); err != nil {
		log.Printf("WARNING: Failed to ensure default collection: %v", err)
	} else {
		fmt.Println("✅ Default collection ensured")
	}

	router := chi.NewMux()
	router.Use(middleware.Logger)
	router.Use(middleware.Recoverer)
	router.Use(cors.Handler(cors.Options{
		AllowedOrigins:   []string{"*"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type"},
		AllowCredentials: true,
		MaxAge:           300,
	}))

	// Setup Huma API for OpenAPI documentation
	// This auto-generates /docs and /openapi.json endpoints
	humaAPI := api.SetupHumaAPI(router)
	_ = humaAPI // API is set up, docs available at /docs and /openapi.json
	fmt.Println("📚 OpenAPI documentation available at /docs and /openapi.json")

	// --- ADDED: Static File Server ---
	// This makes the entire /run/media/dtb/DATA/dam-assets directory available at http://localhost:3000/files/
	fs := http.FileServer(http.Dir(cfg.AssetsPath))
	router.Handle("/files/*", http.StripPrefix("/files/", fs))
	fmt.Printf("📦 Serving asset files from %s at /files/\n", cfg.AssetsPath)
	// --- END ---

	// Register API routes
	router.Get("/", api.GetInfo(cfg, startTime))
	// All API routes are now grouped under /api
	router.Route("/api", func(r chi.Router) {
		api.SetupDAMAPI(r, scannerService, collectionService, projectService, ideaService, songService, trackService, workspaceService, downloadService)
	})

	// Create HTTP server with extended timeouts for long-running scan operations
	server := &http.Server{
		Addr:         ":" + cfg.Port,
		Handler:      router,
		ReadTimeout:  15 * time.Minute, // Allow long request bodies
		WriteTimeout: 15 * time.Minute, // Allow long responses (scan can take time)
		IdleTimeout:  120 * time.Second,
	}

	fmt.Printf("🚀 DAM Server starting on http://localhost:%s\n", cfg.Port)
	fmt.Printf("   ReadTimeout: 15m, WriteTimeout: 15m (for long scan operations)\n")
	if err := server.ListenAndServe(); err != nil {
		log.Fatalf("FATAL: Server failed to start: %v", err)
	}
}
