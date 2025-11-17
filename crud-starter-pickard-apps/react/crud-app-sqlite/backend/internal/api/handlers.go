package api

import (
	"context"
	"items-api/internal/services"
	"items-api/pkg/items"
	"net/http"

	"github.com/danielgtaylor/huma/v2"
	"github.com/go-chi/chi/v5"
)

// API response structures
type APIResponse struct {
	Success bool        `json:"success"`
	Data    interface{} `json:"data,omitempty"`
	Error   *string     `json:"error,omitempty"`
}

type ItemTreeResponse struct {
	Body struct {
		Success bool           `json:"success"`
		Data    items.ItemTree `json:"data"`
	}
}

type ItemResponse struct {
	Body struct {
		Success bool       `json:"success"`
		Data    items.Item `json:"data"`
	}
}

type DeleteResponse struct {
	Body struct {
		Success bool `json:"success"`
		Data    struct {
			Deleted bool `json:"deleted"`
		} `json:"data"`
	}
}

// ItemHandler holds dependencies for item handlers
type ItemHandler struct {
	itemService *services.ItemService
}

func NewItemHandler(itemService *services.ItemService) *ItemHandler {
	return &ItemHandler{
		itemService: itemService,
	}
}

// RegisterRoutes registers all API routes
func (h *ItemHandler) RegisterRoutes(api huma.API, r chi.Router) {
	// GET /api/items/tree - Get all items grouped by category
	huma.Register(api, huma.Operation{
		OperationID: "getItemTree",
		Method:      http.MethodGet,
		Path:        "/api/items/tree",
		Summary:     "Get item tree",
		Description: "Retrieve all items organized by category",
		Tags:        []string{"items"},
	}, func(ctx context.Context, input *struct{}) (*ItemTreeResponse, error) {
		tree, err := h.itemService.GetItemTree()
		if err != nil {
			return nil, huma.Error500InternalServerError("Failed to retrieve items")
		}

		resp := &ItemTreeResponse{}
		resp.Body.Success = true
		resp.Body.Data = tree
		return resp, nil
	})

	// POST /api/items - Create a new item
	huma.Register(api, huma.Operation{
		OperationID: "createItem",
		Method:      http.MethodPost,
		Path:        "/api/items",
		Summary:     "Create item",
		Description: "Create a new item",
		Tags:        []string{"items"},
	}, func(ctx context.Context, input *struct {
		Body *items.ItemInput
	}) (*ItemResponse, error) {
		if input.Body.Name == "" {
			return nil, huma.Error400BadRequest("Name is required")
		}
		if len(input.Body.Categories) != 1 {
			return nil, huma.Error400BadRequest("Exactly one category is required")
		}

		newItem, err := h.itemService.CreateItem(*input.Body)
		if err != nil {
			if err.Error() == "name is required" || err.Error() == "exactly one category is required" {
				return nil, huma.Error400BadRequest(err.Error())
			}
			if contains(err.Error(), "already exists") {
				return nil, huma.Error409Conflict(err.Error())
			}
			return nil, huma.Error500InternalServerError("Failed to create item")
		}

		resp := &ItemResponse{}
		resp.Body.Success = true
		resp.Body.Data = *newItem
		return resp, nil
	})

	// GET /api/items/{categorySlug}/{itemSlug} - Get a specific item
	huma.Register(api, huma.Operation{
		OperationID: "getItem",
		Method:      http.MethodGet,
		Path:        "/api/items/{categorySlug}/{itemSlug}",
		Summary:     "Get item",
		Description: "Retrieve a specific item by category and slug",
		Tags:        []string{"items"},
	}, func(ctx context.Context, input *struct {
		CategorySlug string `path:"categorySlug"`
		ItemSlug     string `path:"itemSlug"`
	}) (*ItemResponse, error) {
		if input.CategorySlug == "" || input.ItemSlug == "" {
			return nil, huma.Error400BadRequest("Category slug and item slug are required")
		}

		item, err := h.itemService.GetItem(input.CategorySlug, input.ItemSlug)
		if err != nil {
			if contains(err.Error(), "not found") {
				return nil, huma.Error404NotFound("Item not found")
			}
			return nil, huma.Error500InternalServerError("Failed to retrieve item")
		}

		resp := &ItemResponse{}
		resp.Body.Success = true
		resp.Body.Data = *item
		return resp, nil
	})

	// PATCH /api/items/{categorySlug}/{itemSlug} - Update an item
	huma.Register(api, huma.Operation{
		OperationID: "updateItem",
		Method:      http.MethodPatch,
		Path:        "/api/items/{categorySlug}/{itemSlug}",
		Summary:     "Update item",
		Description: "Update an existing item",
		Tags:        []string{"items"},
	}, func(ctx context.Context, input *struct {
		CategorySlug string `path:"categorySlug"`
		ItemSlug     string `path:"itemSlug"`
		Body         *items.ItemUpdateInput
	}) (*ItemResponse, error) {
		if input.CategorySlug == "" || input.ItemSlug == "" {
			return nil, huma.Error400BadRequest("Category slug and item slug are required")
		}

		updatedItem, err := h.itemService.UpdateItem(input.CategorySlug, input.ItemSlug, *input.Body)
		if err != nil {
			if contains(err.Error(), "not found") {
				return nil, huma.Error404NotFound("Item not found")
			}
			if contains(err.Error(), "required") {
				return nil, huma.Error400BadRequest(err.Error())
			}
			if contains(err.Error(), "occupied") {
				return nil, huma.Error409Conflict(err.Error())
			}
			return nil, huma.Error500InternalServerError("Failed to update item")
		}

		resp := &ItemResponse{}
		resp.Body.Success = true
		resp.Body.Data = *updatedItem
		return resp, nil
	})

	// DELETE /api/items/{categorySlug}/{itemSlug} - Delete an item
	huma.Register(api, huma.Operation{
		OperationID: "deleteItem",
		Method:      http.MethodDelete,
		Path:        "/api/items/{categorySlug}/{itemSlug}",
		Summary:     "Delete item",
		Description: "Delete an item",
		Tags:        []string{"items"},
	}, func(ctx context.Context, input *struct {
		CategorySlug string `path:"categorySlug"`
		ItemSlug     string `path:"itemSlug"`
	}) (*DeleteResponse, error) {
		if input.CategorySlug == "" || input.ItemSlug == "" {
			return nil, huma.Error400BadRequest("Category slug and item slug are required")
		}

		err := h.itemService.DeleteItem(input.CategorySlug, input.ItemSlug)
		if err != nil {
			if contains(err.Error(), "not found") {
				return nil, huma.Error404NotFound("Item not found")
			}
			return nil, huma.Error500InternalServerError("Failed to delete item")
		}

		resp := &DeleteResponse{}
		resp.Body.Success = true
		resp.Body.Data.Deleted = true
		return resp, nil
	})
}

// Helper function to check if string contains substring
func contains(s, substr string) bool {
	return len(s) >= len(substr) && (s == substr || len(substr) == 0 ||
		(len(s) > len(substr) && (s[:len(substr)] == substr || s[len(s)-len(substr):] == substr ||
			func() bool {
				for i := 0; i <= len(s)-len(substr); i++ {
					if s[i:i+len(substr)] == substr {
						return true
					}
				}
				return false
			}())))
}
