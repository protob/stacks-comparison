package handlers

import (
	"encoding/json"
	"errors"
	"fmt"
	"items-api/internal/common"
	"items-api/internal/storage"
	"items-api/pkg/items"
	"net/http"
	"os"

	"github.com/go-chi/chi/v5"
)

// ItemHandler holds dependencies for item handlers
type ItemHandler struct {
	Storage *storage.Service
}

// NewItemHandler creates a new handler instance
func NewItemHandler(s *storage.Service) *ItemHandler {
	return &ItemHandler{Storage: s}
}

// GetItemTree handles GET /api/items/tree
func (h *ItemHandler) GetItemTree(w http.ResponseWriter, r *http.Request) {
	tree, err := h.Storage.GetItemTree()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error getting item tree: %v\n", err)
		common.RespondWithError(w, common.NewErrorResponse("Failed to retrieve items", http.StatusInternalServerError))
		return
	}

	response := common.APIResponse{
		Success: true,
		Data:    tree,
	}
	common.RespondWithJSON(w, http.StatusOK, response)
}

// CreateItem handles POST /api/items
func (h *ItemHandler) CreateItem(w http.ResponseWriter, r *http.Request) {
	var input items.ItemInput
	if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
		common.RespondWithError(w, common.NewErrorResponse("Invalid JSON", http.StatusBadRequest))
		return
	}

	// Validate input
	if input.Name == "" {
		common.RespondWithError(w, common.NewErrorResponse("Name is required", http.StatusBadRequest))
		return
	}
	if len(input.Categories) != 1 {
		common.RespondWithError(w, common.NewErrorResponse("Exactly one category is required", http.StatusBadRequest))
		return
	}

	newItem, err := h.Storage.CreateItem(input)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error creating item: %v\n", err)
		statusCode := http.StatusInternalServerError
		if errors.Is(err, common.ErrInvalidInput) {
			statusCode = http.StatusBadRequest
		} else if errors.Is(err, common.ErrConflict) {
			statusCode = http.StatusConflict
		}
		common.RespondWithError(w, common.NewErrorResponse(err.Error(), statusCode))
		return
	}

	response := common.APIResponse{
		Success: true,
		Data:    newItem,
	}
	common.RespondWithJSON(w, http.StatusCreated, response)
}

// GetItem handles GET /api/items/{categorySlug}/{itemSlug}
func (h *ItemHandler) GetItem(w http.ResponseWriter, r *http.Request) {
	categorySlug := chi.URLParam(r, "categorySlug")
	itemSlug := chi.URLParam(r, "itemSlug")

	if categorySlug == "" || itemSlug == "" {
		common.RespondWithError(w, common.NewErrorResponse("Category slug and item slug are required", http.StatusBadRequest))
		return
	}

	item, err := h.Storage.GetItem(categorySlug, itemSlug)
	if err != nil {
		if errors.Is(err, common.ErrNotFound) {
			common.RespondWithError(w, common.NewErrorResponse("Item not found", http.StatusNotFound))
		} else {
			fmt.Fprintf(os.Stderr, "Error getting item %s/%s: %v\n", categorySlug, itemSlug, err)
			common.RespondWithError(w, common.NewErrorResponse("Failed to retrieve item", http.StatusInternalServerError))
		}
		return
	}

	response := common.APIResponse{
		Success: true,
		Data:    item,
	}
	common.RespondWithJSON(w, http.StatusOK, response)
}

// UpdateItem handles PATCH /api/items/{categorySlug}/{itemSlug}
func (h *ItemHandler) UpdateItem(w http.ResponseWriter, r *http.Request) {
	categorySlug := chi.URLParam(r, "categorySlug")
	itemSlug := chi.URLParam(r, "itemSlug")

	if categorySlug == "" || itemSlug == "" {
		common.RespondWithError(w, common.NewErrorResponse("Category slug and item slug are required", http.StatusBadRequest))
		return
	}

	var input items.ItemUpdateInput
	if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
		common.RespondWithError(w, common.NewErrorResponse("Invalid JSON", http.StatusBadRequest))
		return
	}

	updatedItem, err := h.Storage.UpdateItem(categorySlug, itemSlug, input)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error updating item %s/%s: %v\n", categorySlug, itemSlug, err)
		statusCode := http.StatusInternalServerError
		if errors.Is(err, common.ErrNotFound) {
			statusCode = http.StatusNotFound
		} else if errors.Is(err, common.ErrInvalidInput) {
			statusCode = http.StatusBadRequest
		} else if errors.Is(err, common.ErrConflict) {
			statusCode = http.StatusConflict
		}
		common.RespondWithError(w, common.NewErrorResponse(err.Error(), statusCode))
		return
	}

	response := common.APIResponse{
		Success: true,
		Data:    updatedItem,
	}
	common.RespondWithJSON(w, http.StatusOK, response)
}

// DeleteItem handles DELETE /api/items/{categorySlug}/{itemSlug}
func (h *ItemHandler) DeleteItem(w http.ResponseWriter, r *http.Request) {
	categorySlug := chi.URLParam(r, "categorySlug")
	itemSlug := chi.URLParam(r, "itemSlug")

	if categorySlug == "" || itemSlug == "" {
		common.RespondWithError(w, common.NewErrorResponse("Category slug and item slug are required", http.StatusBadRequest))
		return
	}

	err := h.Storage.DeleteItem(categorySlug, itemSlug)
	if err != nil {
		if errors.Is(err, common.ErrNotFound) {
			common.RespondWithError(w, common.NewErrorResponse("Item not found", http.StatusNotFound))
		} else {
			fmt.Fprintf(os.Stderr, "Error deleting item %s/%s: %v\n", categorySlug, itemSlug, err)
			common.RespondWithError(w, common.NewErrorResponse("Failed to delete item", http.StatusInternalServerError))
		}
		return
	}

	response := common.APIResponse{
		Success: true,
		Data:    map[string]bool{"deleted": true},
	}
	common.RespondWithJSON(w, http.StatusOK, response)
}
