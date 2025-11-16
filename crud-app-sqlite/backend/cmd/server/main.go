package main

import (
	"fmt"
	"items-api/internal/api"
	"items-api/internal/config"
	"items-api/internal/database"
	"items-api/internal/services"
	"log"
	"net/http"

	"github.com/danielgtaylor/huma/v2"
	"github.com/danielgtaylor/huma/v2/adapters/humachi"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
)

func main() {
	// Load configuration
	cfg, err := config.LoadConfig()
	if err != nil {
		log.Fatalf("FATAL: Could not load config: %v", err)
	}

	// Initialize database
	db, err := database.NewDatabase(cfg.DatabaseURL)
	if err != nil {
		log.Fatalf("FATAL: Could not initialize database: %v", err)
	}
	defer db.Close()

	fmt.Println("✅ Database connected successfully")

	// Apply schema to ensure all tables exist
	if err := database.ApplySchema(db.DB, "db/schema.sql"); err != nil {
		log.Fatalf("FATAL: Could not apply database schema: %v", err)
	}

	// Initialize services
	itemService := services.NewItemService(db.Queries)

	// Initialize handlers
	itemHandler := api.NewItemHandler(itemService)

	// Setup router
	router := chi.NewRouter()

	// Middleware
	router.Use(middleware.Logger)
	router.Use(middleware.Recoverer)
	router.Use(cors.Handler(cors.Options{
		AllowedOrigins:   []string{"*"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
		ExposedHeaders:   []string{"Link"},
		AllowCredentials: true,
		MaxAge:           300,
	}))

	// Setup Huma API for OpenAPI documentation
	// This auto-generates /docs and /openapi.json endpoints
	apiConfig := huma.DefaultConfig("Items CRUD API", "1.0.0")
	apiConfig.Info.Description = "Items CRUD API with SQLite, Huma, Chi, and sqlc"
	apiConfig.Servers = []*huma.Server{
		{URL: fmt.Sprintf("http://localhost:%s", cfg.Port)},
	}
	humaAPI := humachi.New(router, apiConfig)
	fmt.Println("📚 OpenAPI documentation available at /docs and /openapi.json")

	// Register routes
	itemHandler.RegisterRoutes(humaAPI, router)

	// Health check endpoint
	router.Get("/health", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("OK"))
	})

	// Start server
	addr := cfg.GetAddr()
	fmt.Printf("🚀 Items API Server starting on http://localhost%s\n", addr)
	fmt.Printf("   Database: %s\n", cfg.DatabaseURL)

	if err := http.ListenAndServe(addr, router); err != nil {
		log.Fatalf("FATAL: Server failed to start: %v", err)
	}
}
