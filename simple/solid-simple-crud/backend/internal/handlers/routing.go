package handlers

import (
	"items-api/internal/common"
	"net/http"

	"github.com/go-chi/chi/v5"
)

// RegisterItemRoutes sets up the routes for item management
func RegisterItemRoutes(r chi.Router, pathPrefix string, h *ItemHandler) {
	r.Route(pathPrefix, func(r chi.Router) {
		r.Get("/tree", h.GetItemTree) // GET /api/items/tree
		r.Post("/", h.CreateItem)     // POST /api/items

		// Routes with category and item slug parameters
		r.Route("/{categorySlug}/{itemSlug}", func(r chi.Router) {
			r.Get("/", h.GetItem)       // GET /api/items/{categorySlug}/{itemSlug}
			r.Patch("/", h.UpdateItem)  // PATCH /api/items/{categorySlug}/{itemSlug}
			r.Delete("/", h.DeleteItem) // DELETE /api/items/{categorySlug}/{itemSlug}
		})

		// OPTIONS handler for CORS preflight
		r.Options("/*", func(w http.ResponseWriter, r *http.Request) {
			w.WriteHeader(http.StatusOK)
		})
	})

	// Health check for this route group
	r.Get(pathPrefix+"/health", func(w http.ResponseWriter, r *http.Request) {
		common.RespondWithSuccess(w, map[string]string{"status": "OK", "type": "items"})
	})
}
