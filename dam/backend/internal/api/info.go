package api

import (
	"dam-backend/internal/config"
	"encoding/json"
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
			Service:     "dam-api",
			Version:     "1.0.0",
			Description: "Backend API for DAM music library application.",
			Endpoints: map[string]string{
				"docs":    "/docs",
				"health":  "/health", // Placeholder for future health endpoint
				"albums":  "/api/albums/{albumId}",
				"artists": "/api/artists/{artistId}", // Placeholder
			},
			Environment: map[string]string{
				"data_path": cfg.DataPath,
				"port":      cfg.Port,
			},
			Uptime: time.Since(startTime).String(),
			Docs:   "/docs",
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(info)
	}
}
