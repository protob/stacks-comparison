-- Items CRUD Database Schema
-- SQLite schema for items management

-- Items table
CREATE TABLE IF NOT EXISTS items (
    id                TEXT PRIMARY KEY,
    slug              TEXT NOT NULL,
    name              TEXT NOT NULL,
    text              TEXT,
    is_completed      BOOLEAN NOT NULL DEFAULT 0,
    priority          TEXT NOT NULL DEFAULT 'mid',
    tags              TEXT, -- JSON array: ["tag1", "tag2"]
    categories        TEXT NOT NULL, -- JSON array with exactly one category: ["category"]
    created_at        TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at        TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_items_slug ON items(slug);
CREATE INDEX IF NOT EXISTS idx_items_is_completed ON items(is_completed);
CREATE INDEX IF NOT EXISTS idx_items_priority ON items(priority);
CREATE INDEX IF NOT EXISTS idx_items_created_at ON items(created_at);

-- Trigger to auto-update updated_at timestamp
CREATE TRIGGER IF NOT EXISTS update_items_updated_at
AFTER UPDATE ON items
FOR EACH ROW
BEGIN
    UPDATE items SET updated_at = CURRENT_TIMESTAMP WHERE id = OLD.id;
END;