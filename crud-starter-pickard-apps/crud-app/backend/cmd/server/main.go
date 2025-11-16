package main

import (
	"errors"
	"fmt"
	"items-api/internal/config"
	"items-api/internal/handlers"
	"items-api/internal/storage"
	"net/http"
	"os"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
)

func main() {
	// Load Configuration
	cfg, err := config.LoadConfig()
	if err != nil {
		fmt.Fprintf(os.Stderr, "CRITICAL: Error loading configuration: %v\n", err)
		os.Exit(1)
	}

	// Initialize Storage Service
	storageService := storage.NewService(cfg.DataPath)

	// Initialize Router
	r := chi.NewRouter()

	// Middleware
	r.Use(middleware.RequestID)
	r.Use(middleware.RealIP)
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)
	r.Use(cors.Handler(cors.Options{
		AllowedOrigins:   []string{"*"}, // Allow all for development, restrict in production
		AllowedMethods:   []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
		ExposedHeaders:   []string{"Link"},
		AllowCredentials: true,
		MaxAge:           300,
	}))

	// API Routes
	r.Route("/api", func(r chi.Router) {
		// Initialize Item Handlers
		itemHandlers := handlers.NewItemHandler(storageService)
		// Register Item Routes
		handlers.RegisterItemRoutes(r, "/items", itemHandlers)
	})

	// Health Check
	r.Get("/api/health", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		fmt.Fprintln(w, `{"success": true, "data": {"status": "OK"}}`)
	})

	// Start Server
	fmt.Printf("Items API Server starting on port %s...\n", cfg.Port)
	fmt.Printf("Serving data from: %s\n", cfg.DataPath)
	fmt.Printf("API endpoints available under /api\n")

	err = http.ListenAndServe(":"+cfg.Port, r)
	if err != nil && !errors.Is(err, http.ErrServerClosed) {
		fmt.Fprintf(os.Stderr, "CRITICAL: Error starting server: %v\n", err)
		os.Exit(1)
	}
}
