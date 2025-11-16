package services

import (
	"context"
	"database/sql"
	"encoding/json"
	"fmt"
	"items-api/internal/common"
	"items-api/internal/db"
	"items-api/pkg/items"

	"github.com/google/uuid"
)

type ItemService struct {
	queries *db.Queries
}

func NewItemService(queries *db.Queries) *ItemService {
	return &ItemService{
		queries: queries,
	}
}

// Helper functions for JSON handling
func tagsToString(tags []string) sql.NullString {
	if len(tags) == 0 {
		return sql.NullString{Valid: false}
	}
	data, _ := json.Marshal(tags)
	return sql.NullString{String: string(data), Valid: true}
}

func stringToTags(s sql.NullString) []string {
	if !s.Valid || s.String == "" {
		return []string{}
	}
	var tags []string
	json.Unmarshal([]byte(s.String), &tags)
	return tags
}

func categoriesToString(categories []string) (string, error) {
	if len(categories) != 1 {
		return "", fmt.Errorf("exactly one category is required")
	}
	data, _ := json.Marshal(categories)
	return string(data), nil
}

func stringToCategories(s string) []string {
	var categories []string
	json.Unmarshal([]byte(s), &categories)
	return categories
}

func dbItemToItem(dbItem db.Item) *items.Item {
	return &items.Item{
		ID:          dbItem.ID,
		Slug:        dbItem.Slug,
		Name:        dbItem.Name,
		Text:        dbItem.Text.String,
		IsCompleted: dbItem.IsCompleted,
		Priority:    items.Priority(dbItem.Priority),
		Tags:        stringToTags(dbItem.Tags),
		Categories:  stringToCategories(dbItem.Categories),
		CreatedAt:   dbItem.CreatedAt,
		UpdatedAt:   dbItem.UpdatedAt,
	}
}

func (s *ItemService) CreateItem(input items.ItemInput) (*items.Item, error) {
	// Validate input
	if input.Name == "" {
		return nil, fmt.Errorf("%w: name is required", common.ErrInvalidInput)
	}
	if len(input.Categories) != 1 {
		return nil, fmt.Errorf("%w: exactly one category is required", common.ErrInvalidInput)
	}

	id := uuid.New().String()
	slug := common.Slugify(input.Name)

	categoriesStr, err := categoriesToString(input.Categories)
	if err != nil {
		return nil, err
	}

	// Check if item already exists
	categorySlug := common.Slugify(input.Categories[0])
	_, err = s.queries.GetItem(context.Background(), db.GetItemParams{
		Slug:       slug,
		Categories: categorySlug,
	})
	if err == nil {
		return nil, fmt.Errorf("%w: item with name '%s' already exists in category '%s'", common.ErrConflict, input.Name, categorySlug)
	}

	// Set defaults
	priority := string(input.Priority)
	if priority == "" {
		priority = string(items.PriorityMid)
	}

	// Create item
	dbItem, err := s.queries.CreateItem(context.Background(), db.CreateItemParams{
		ID:          id,
		Slug:        slug,
		Name:        input.Name,
		Text:        sql.NullString{String: input.Text, Valid: input.Text != ""},
		IsCompleted: false,
		Priority:    priority,
		Tags:        tagsToString(input.Tags),
		Categories:  categoriesStr,
	})
	if err != nil {
		return nil, fmt.Errorf("%w: failed to create item: %v", common.ErrStorage, err)
	}

	return dbItemToItem(dbItem), nil
}

func (s *ItemService) GetItem(categorySlug, itemSlug string) (*items.Item, error) {
	dbItem, err := s.queries.GetItem(context.Background(), db.GetItemParams{
		Slug:       itemSlug,
		Categories: categorySlug,
	})
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, fmt.Errorf("%w: item not found", common.ErrNotFound)
		}
		return nil, fmt.Errorf("%w: failed to get item: %v", common.ErrStorage, err)
	}

	return dbItemToItem(dbItem), nil
}

func (s *ItemService) GetItemTree() (items.ItemTree, error) {
	// Get all items
	allItems, err := s.queries.GetAllItems(context.Background())
	if err != nil {
		return nil, fmt.Errorf("%w: failed to get items: %v", common.ErrStorage, err)
	}

	// Group by category
	tree := make(items.ItemTree)
	for _, dbItem := range allItems {
		item := dbItemToItem(dbItem)
		categories := stringToCategories(dbItem.Categories)
		if len(categories) > 0 {
			category := categories[0]
			tree[category] = append(tree[category], *item)
		}
	}

	// Sort items in each category by creation date (newest first)
	for category := range tree {
		items := tree[category]
		for i := 0; i < len(items)-1; i++ {
			for j := i + 1; j < len(items); j++ {
				if items[i].CreatedAt.Before(items[j].CreatedAt) {
					items[i], items[j] = items[j], items[i]
				}
			}
		}
	}

	return tree, nil
}

func (s *ItemService) UpdateItem(categorySlug, itemSlug string, input items.ItemUpdateInput) (*items.Item, error) {
	// Get existing item first
	existing, err := s.queries.GetItem(context.Background(), db.GetItemParams{
		Slug:       itemSlug,
		Categories: categorySlug,
	})
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, fmt.Errorf("%w: item not found", common.ErrNotFound)
		}
		return nil, fmt.Errorf("%w: failed to get item: %v", common.ErrStorage, err)
	}

	// Prepare updates
	updateParams := db.UpdateItemParams{
		ID: existing.ID,
	}

	updated := false
	newSlug := itemSlug
	newCategorySlug := categorySlug

	if input.Name != nil && *input.Name != existing.Name {
		updateParams.Name = sql.NullString{String: *input.Name, Valid: true}
		newSlug = common.Slugify(*input.Name)
		updateParams.Slug = sql.NullString{String: newSlug, Valid: true}
		updated = true
	}

	if input.Text != nil {
		updateParams.Text = sql.NullString{String: *input.Text, Valid: true}
		updated = true
	}

	if input.Priority != nil {
		updateParams.Priority = sql.NullString{String: string(*input.Priority), Valid: true}
		updated = true
	}

	if input.IsCompleted != nil {
		updateParams.IsCompleted = sql.NullBool{Bool: *input.IsCompleted, Valid: true}
		updated = true
	}

	if input.Tags != nil {
		updateParams.Tags = tagsToString(input.Tags)
		updated = true
	}

	if input.Categories != nil {
		if len(input.Categories) != 1 {
			return nil, fmt.Errorf("%w: exactly one category is required", common.ErrInvalidInput)
		}
		newCategorySlug = common.Slugify(input.Categories[0])
		categoriesStr, err := categoriesToString(input.Categories)
		if err != nil {
			return nil, err
		}
		updateParams.Categories = sql.NullString{String: categoriesStr, Valid: true}
		updated = true
	}

	if !updated {
		return dbItemToItem(existing), nil
	}

	// Check for conflicts if slug or category changed
	if newSlug != itemSlug || newCategorySlug != categorySlug {
		conflictItem, err := s.queries.GetItem(context.Background(), db.GetItemParams{
			Slug:       newSlug,
			Categories: newCategorySlug,
		})
		if err == nil && conflictItem.ID != existing.ID {
			return nil, fmt.Errorf("%w: target location already occupied by different item", common.ErrConflict)
		}
	}

	// Update item
	dbItem, err := s.queries.UpdateItem(context.Background(), updateParams)
	if err != nil {
		return nil, fmt.Errorf("%w: failed to update item: %v", common.ErrStorage, err)
	}

	return dbItemToItem(dbItem), nil
}

func (s *ItemService) DeleteItem(categorySlug, itemSlug string) error {
	// Get item to verify it exists
	existing, err := s.queries.GetItem(context.Background(), db.GetItemParams{
		Slug:       itemSlug,
		Categories: categorySlug,
	})
	if err != nil {
		if err == sql.ErrNoRows {
			return fmt.Errorf("%w: item not found", common.ErrNotFound)
		}
		return fmt.Errorf("%w: failed to get item: %v", common.ErrStorage, err)
	}

	// Delete item
	err = s.queries.DeleteItem(context.Background(), existing.ID)
	if err != nil {
		return fmt.Errorf("%w: failed to delete item: %v", common.ErrStorage, err)
	}

	return nil
}
