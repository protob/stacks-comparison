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
	"github.com/go-chi/cors"
)

func main() {
	// Load configuration
	cfg, err := config.LoadConfig()
	if err != nil {
		log.Fatalf("Failed to load configuration: %v", err)
	}

	// Initialize database
	db, err := database.NewDatabase(cfg.DatabaseURL)
	if err != nil {
		log.Fatalf("Failed to initialize database: %v", err)
	}
	defer db.Close()

	// Initialize services
	itemService := services.NewItemService(db.Queries)

	// Initialize handlers
	itemHandler := api.NewItemHandler(itemService)

	// Setup router
	router := chi.NewRouter()

	// CORS middleware
	router.Use(cors.Handler(cors.Options{
		AllowedOrigins:   []string{"http://localhost:5173", "http://localhost:3000"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
		ExposedHeaders:   []string{"Link"},
		AllowCredentials: false,
		MaxAge:           300,
	}))

	// Setup Huma API
	apiConfig := huma.DefaultConfig("Items API", "1.0.0")
	apiConfig.Servers = []*huma.Server{
		{URL: fmt.Sprintf("http://localhost:%s", cfg.Port)},
	}
	humaAPI := humachi.New(router, apiConfig)

	// Register routes
	itemHandler.RegisterRoutes(humaAPI, router)

	// Health check endpoint
	router.Get("/health", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("OK"))
	})

	// Start server
	addr := cfg.GetAddr()
	fmt.Printf("Server starting on %s\n", addr)
	fmt.Printf("Database: %s\n", cfg.DatabaseURL)

	if err := http.ListenAndServe(addr, router); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}
