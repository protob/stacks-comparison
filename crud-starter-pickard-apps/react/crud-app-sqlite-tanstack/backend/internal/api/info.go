package api

import (
	"encoding/json"
	"items-api/internal/config"
	"net/http"
	"time"
)

type InfoResponse struct {
	Service     string            `json:"service"`
	Version     string            `json:"version"`
	Description string            `json:"description"`
	Endpoints   map[string]string `json:"endpoints"`
	Environment map[string]string `json:"environment"`
	Uptime      string            `json:"uptime"`
	Docs        string            `json:"docs"`
}

func GetInfo(cfg *config.Config, startTime time.Time) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		info := InfoResponse{
			Service:     "items-crud-api",
			Version:     "1.0.0",
			Description: "Items CRUD API with SQLite, Huma, Chi, and sqlc",
			Endpoints: map[string]string{
				"docs":        "/docs",
				"openapi":     "/openapi.json",
				"health":      "/health",
				"items_tree":  "/api/items/tree",
				"items":       "/api/items",
				"item_detail": "/api/items/{categorySlug}/{itemSlug}",
			},
			Environment: map[string]string{
				"data_path":    cfg.DataPath,
				"database_url": cfg.DatabaseURL,
				"port":         cfg.Port,
			},
			Uptime: time.Since(startTime).String(),
			Docs:   "/docs",
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(info)
	}
}
