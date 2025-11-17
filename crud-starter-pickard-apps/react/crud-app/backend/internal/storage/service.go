package storage

import (
	"errors"
	"fmt"
	"items-api/internal/common"
	"items-api/pkg/items"
	"path/filepath"
	"sort"
	"sync"
	"time"

	"github.com/google/uuid"
)

const (
	itemsBasePath = "items"
	itemFileName  = "item.yaml"
)

// Service handles storage operations for items
type Service struct {
	baseDataPath string
	mu           sync.RWMutex
}

// NewService creates a new storage service instance
func NewService(baseDataPath string) *Service {
	itemsPath := filepath.Join(baseDataPath, itemsBasePath)
	if err := common.EnsureDir(itemsPath); err != nil {
		fmt.Printf("CRITICAL: Failed to ensure items directory %s: %v\n", itemsPath, err)
	} else {
		fmt.Printf("INFO: Ensured items directory exists: %s\n", itemsPath)
	}

	return &Service{
		baseDataPath: baseDataPath,
	}
}

// Path Helpers
func (s *Service) getItemsBasePath() string {
	return filepath.Join(s.baseDataPath, itemsBasePath)
}

func (s *Service) getCategoryPath(categorySlug string) string {
	return filepath.Join(s.getItemsBasePath(), categorySlug)
}

func (s *Service) getItemFolderPath(categorySlug, itemSlug string) string {
	return filepath.Join(s.getCategoryPath(categorySlug), itemSlug)
}

func (s *Service) getItemFilePath(categorySlug, itemSlug string) string {
	return filepath.Join(s.getItemFolderPath(categorySlug, itemSlug), itemFileName)
}

// generateID creates a new unique ID
func (s *Service) generateID() string {
	return uuid.New().String()
}

// CreateItem creates a new item
func (s *Service) CreateItem(input items.ItemInput) (*items.Item, error) {
	s.mu.Lock()
	defer s.mu.Unlock()

	// Validate input
	if input.Name == "" {
		return nil, fmt.Errorf("%w: name is required", common.ErrInvalidInput)
	}
	if len(input.Categories) != 1 {
		return nil, fmt.Errorf("%w: exactly one category is required", common.ErrInvalidInput)
	}

	now := time.Now().UTC()
	id := s.generateID()
	itemSlug := common.Slugify(input.Name)
	categorySlug := common.Slugify(input.Categories[0])

	// Check if item already exists
	filePath := s.getItemFilePath(categorySlug, itemSlug)
	if err := common.ReadYAML(filePath, &struct{}{}); err == nil {
		return nil, fmt.Errorf("%w: item with name '%s' already exists in category '%s'", common.ErrConflict, input.Name, categorySlug)
	}

	// Create new item
	newItem := &items.Item{
		ID:          id,
		Slug:        itemSlug,
		Name:        input.Name,
		Text:        input.Text,
		IsCompleted: false,
		Priority:    input.Priority,
		Tags:        input.Tags,
		Categories:  []string{categorySlug}, // Store the slugified category
		CreatedAt:   now,
		UpdatedAt:   now,
	}

	// Ensure defaults
	if newItem.Tags == nil {
		newItem.Tags = []string{}
	}
	if newItem.Priority == "" {
		newItem.Priority = items.PriorityMid
	}

	// Save to file
	if err := common.WriteYAML(filePath, newItem); err != nil {
		return nil, fmt.Errorf("%w: failed to save new item: %v", common.ErrStorage, err)
	}

	return newItem, nil
}

// GetItem retrieves a single item
func (s *Service) GetItem(categorySlug, itemSlug string) (*items.Item, error) {
	s.mu.RLock()
	defer s.mu.RUnlock()

	filePath := s.getItemFilePath(categorySlug, itemSlug)
	item := &items.Item{}

	err := common.ReadYAML(filePath, item)
	if err != nil {
		if errors.Is(err, common.ErrNotFound) {
			return nil, fmt.Errorf("%w: item not found", common.ErrNotFound)
		}
		return nil, fmt.Errorf("%w: failed to read item: %v", common.ErrStorage, err)
	}

	return item, nil
}

// GetItemTree retrieves all items organized by category
func (s *Service) GetItemTree() (items.ItemTree, error) {
	s.mu.RLock()
	defer s.mu.RUnlock()

	tree := make(items.ItemTree)
	itemsBasePath := s.getItemsBasePath()

	categories, err := common.ListDirs(itemsBasePath)
	if err != nil {
		return nil, fmt.Errorf("%w: failed to list categories: %v", common.ErrStorage, err)
	}

	for _, categorySlug := range categories {
		categoryPath := s.getCategoryPath(categorySlug)
		itemSlugs, err := common.ListDirs(categoryPath)
		if err != nil {
			fmt.Printf("WARN: Failed to list items in category %s: %v\n", categorySlug, err)
			continue
		}

		var categoryItems []items.Item
		for _, itemSlug := range itemSlugs {
			item, err := s.getItemInternal(categorySlug, itemSlug)
			if err != nil {
				fmt.Printf("WARN: Failed to read item %s/%s: %v\n", categorySlug, itemSlug, err)
				continue
			}
			categoryItems = append(categoryItems, *item)
		}

		// Sort items by creation date, newest first
		sort.Slice(categoryItems, func(i, j int) bool {
			return categoryItems[i].CreatedAt.After(categoryItems[j].CreatedAt)
		})

		if len(categoryItems) > 0 {
			tree[categorySlug] = categoryItems
		}
	}

	return tree, nil
}

// UpdateItem updates an existing item
func (s *Service) UpdateItem(categorySlug, itemSlug string, input items.ItemUpdateInput) (*items.Item, error) {
	s.mu.Lock()
	defer s.mu.Unlock()

	// Read existing item
	existingItem, err := s.getItemInternal(categorySlug, itemSlug)
	if err != nil {
		return nil, err
	}

	// Apply updates
	updated := false
	newCategorySlug := categorySlug
	newItemSlug := itemSlug

	if input.Name != nil && *input.Name != existingItem.Name {
		existingItem.Name = *input.Name
		newItemSlug = common.Slugify(*input.Name)
		updated = true
	}
	if input.Text != nil && *input.Text != existingItem.Text {
		existingItem.Text = *input.Text
		updated = true
	}
	if input.Priority != nil && *input.Priority != existingItem.Priority {
		existingItem.Priority = *input.Priority
		updated = true
	}
	if input.IsCompleted != nil && *input.IsCompleted != existingItem.IsCompleted {
		existingItem.IsCompleted = *input.IsCompleted
		updated = true
	}
	if input.Tags != nil {
		existingItem.Tags = input.Tags
		updated = true
	}
	if input.Categories != nil {
		if len(input.Categories) != 1 {
			return nil, fmt.Errorf("%w: exactly one category is required", common.ErrInvalidInput)
		}
		newCategorySlug = common.Slugify(input.Categories[0])
		if newCategorySlug != categorySlug {
			existingItem.Categories = []string{newCategorySlug}
			updated = true
		}
	}

	if !updated {
		return existingItem, nil
	}

	// Update timestamp
	existingItem.UpdatedAt = time.Now().UTC()
	existingItem.Slug = newItemSlug

	// Handle potential move (category or name change)
	oldPath := s.getItemFolderPath(categorySlug, itemSlug)
	newPath := s.getItemFolderPath(newCategorySlug, newItemSlug)

	if oldPath != newPath {
		// Check for conflicts at new location
		newFilePath := s.getItemFilePath(newCategorySlug, newItemSlug)
		existingFile := &items.Item{}
		if err := common.ReadYAML(newFilePath, existingFile); err == nil {
			if existingFile.ID != existingItem.ID {
				return nil, fmt.Errorf("%w: target location already occupied by different item", common.ErrConflict)
			}
		}

		// Save to new location
		if err := common.WriteYAML(newFilePath, existingItem); err != nil {
			return nil, fmt.Errorf("%w: failed to save item to new location: %v", common.ErrStorage, err)
		}

		// Remove old location
		if err := common.RemoveDir(oldPath); err != nil {
			fmt.Printf("WARN: Failed to remove old item folder %s: %v\n", oldPath, err)
		}
	} else {
		// Same location, just update
		filePath := s.getItemFilePath(categorySlug, itemSlug)
		if err := common.WriteYAML(filePath, existingItem); err != nil {
			return nil, fmt.Errorf("%w: failed to save updated item: %v", common.ErrStorage, err)
		}
	}

	return existingItem, nil
}

// DeleteItem removes an item
func (s *Service) DeleteItem(categorySlug, itemSlug string) error {
	s.mu.Lock()
	defer s.mu.Unlock()

	// Verify item exists first
	if _, err := s.getItemInternal(categorySlug, itemSlug); err != nil {
		return err
	}

	// Remove the item folder
	itemPath := s.getItemFolderPath(categorySlug, itemSlug)
	if err := common.RemoveDir(itemPath); err != nil {
		return fmt.Errorf("%w: failed to delete item: %v", common.ErrStorage, err)
	}

	return nil
}

// Internal helper that doesn't acquire lock
func (s *Service) getItemInternal(categorySlug, itemSlug string) (*items.Item, error) {
	filePath := s.getItemFilePath(categorySlug, itemSlug)
	item := &items.Item{}

	err := common.ReadYAML(filePath, item)
	if err != nil {
		if errors.Is(err, common.ErrNotFound) {
			return nil, fmt.Errorf("%w: item not found", common.ErrNotFound)
		}
		return nil, fmt.Errorf("%w: failed to read item: %v", common.ErrStorage, err)
	}

	return item, nil
}
