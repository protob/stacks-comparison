package items

import "time"

// Priority represents the priority level of an item
type Priority string

const (
	PriorityLow  Priority = "low"
	PriorityMid  Priority = "mid"
	PriorityHigh Priority = "high"
)

// Item defines the structure for item data
type Item struct {
	ID          string    `json:"id" yaml:"id"`
	Slug        string    `json:"slug" yaml:"slug"`
	Name        string    `json:"name" yaml:"name"`
	Text        string    `json:"text" yaml:"text"`
	IsCompleted bool      `json:"isCompleted" yaml:"isCompleted"`
	Priority    Priority  `json:"priority" yaml:"priority"`
	Tags        []string  `json:"tags" yaml:"tags"`
	Categories  []string  `json:"categories" yaml:"categories"` // Single category enforced at API level
	CreatedAt   time.Time `json:"createdAt" yaml:"createdAt"`
	UpdatedAt   time.Time `json:"updatedAt" yaml:"updatedAt"`
}

// ItemInput defines the expected structure for creating an item
type ItemInput struct {
	Name       string   `json:"name"`
	Text       string   `json:"text"`
	Priority   Priority `json:"priority"`
	Tags       []string `json:"tags,omitempty"`
	Categories []string `json:"categories"` // Must have exactly one category
}

// ItemUpdateInput defines the expected structure for updating an item
type ItemUpdateInput struct {
	Name        *string   `json:"name,omitempty"`
	Text        *string   `json:"text,omitempty"`
	Priority    *Priority `json:"priority,omitempty"`
	Tags        []string  `json:"tags,omitempty"`
	Categories  []string  `json:"categories,omitempty"` // Must have exactly one category if provided
	IsCompleted *bool     `json:"isCompleted,omitempty"`
}

// ItemTree represents the hierarchical structure of items by category
type ItemTree map[string][]Item
