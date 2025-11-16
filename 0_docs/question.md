# Research Question: SQLite Migration Architecture

## Context

This React + Go + SQLite todo app was refactored from YAML/filesystem storage to SQLite database.

### Original Design (YAML/Filesystem)
- Items stored as files: `items/{categorySlug}/{itemSlug}/item.yaml`
- Categories represented as folder structure
- Item MUST belong to exactly one category (filesystem constraint)
- URLs: `/items/{categorySlug}/{itemSlug}`

### Current Design (SQLite)
- Items stored in SQLite database table
- Categories stored as JSON string field: `'["category-slug"]'`
- Backend still requires `categories` field in ALL PATCH requests as single-element array
- URLs remain: `/items/{categorySlug}/{itemSlug}` (slug-based routing)

## Current Issue

When toggling item completion via PATCH request, the backend returns 500 error if `categories` field is missing:

```json
// FAILS with 500:
{"isCompleted": true}

// WORKS:
{"isCompleted": true, "categories": ["work"]}
```

This requirement appears to be a legacy constraint from the YAML/filesystem architecture.

## Research Questions for Modern SQLite Practices

1. **Is the "categories always required" constraint still necessary with SQLite + UUIDs?**
   - Can PATCH requests be simplified to make categories optional when not being updated?
   - What are best practices for partial updates in REST APIs with SQLite?

2. **What are modern best practices for item categorization in SQLite?**
   - Should categories be a separate table with foreign key relationship?
   - Is JSON string storage (`'["category-slug"]'`) appropriate or should this be normalized?
   - Many-to-many relationship vs single category constraint?

3. **How to handle slug-based URL routing if categories become optional or many-to-many?**
   - Current: `/items/{categorySlug}/{itemSlug}`
   - Alternative: `/items/{itemId}` or `/items/{itemSlug}`?
   - How to maintain backward compatibility?

4. **UUID vs Slug-based identification**
   - Should items use UUIDs as primary identifiers instead of slugs?
   - How to handle human-readable URLs with UUIDs?
   - What's the performance impact of slug lookups vs UUID lookups?

5. **Database schema modernization**
   - Should the schema be refactored to remove YAML-era constraints?
   - What migrations would be needed?
   - How to maintain API compatibility during migration?

## Technical Debt

The codebase currently contains:
- Legacy YAML/filesystem code in `backend/internal/storage/service.go`
- SQLite implementation in `backend/internal/services/item_service.go`
- Helper functions that treat categories as single-element arrays: `categoriesToString()` / `stringToCategories()`
- Frontend enforces single category via form validation

## Desired Outcome

Determine whether to:
1. Keep current architecture but simplify PATCH requirements (make categories optional in updates)
2. Modernize schema with proper category table and relationships
3. Hybrid approach: normalize database but maintain single-category business rule

---

## ✅ Resolution (2025-11-16)

### Changes Implemented

Following REST API best practices for partial updates with PATCH requests:

**Frontend Changes:**
- **useItemStore.ts**: Removed redundant `categories` field from `toggleItemCompletion()`
  - Now sends only `{isCompleted: true/false}` instead of including categories
  - Follows REST best practice: PATCH should only include fields being updated

**Backend Changes:**
- **No changes required**: Backend already supported optional categories!
  - `ItemUpdateInput` struct uses `omitempty` for all fields including categories
  - Service layer (lines 220-231) only validates categories if present in request
  - Backend correctly handles partial updates per REST standards

**Cleanup:**
- **Removed legacy YAML code**:
  - Deleted `/backend/internal/handlers/` (old YAML-based handlers)
  - Deleted `/backend/internal/storage/` (filesystem storage service)
  - App now uses only SQLite-based `/backend/internal/api/handlers.go` and `/backend/internal/services/item_service.go`

### Current Architecture

**Database:**
- SQLite with sqlc-generated queries
- UUIDs for primary keys (already implemented!)
- Categories stored as single-element JSON array: `["category-slug"]`
- Simple, maintainable approach for single-category requirement

**API:**
- REST-compliant PATCH requests support partial updates
- Categories field optional when not being updated
- URL routing remains `/items/{categorySlug}/{itemSlug}` for human-readable URLs

### Remaining Considerations

The current architecture is **well-suited** for the single-category use case:
- ✅ JSON storage avoids unnecessary joins for single category
- ✅ UUID primary keys provide security and flexibility
- ✅ Slug-based URLs maintain human-readability
- ✅ REST-compliant partial updates

**Future enhancement opportunity:**
If requirements change to support many-to-many categories, consider:
1. Create `categories` table with junction table for relationships
2. Migrate URL routing to `/items/{itemSlug}` (category-agnostic)
3. Maintain backward compatibility via redirects
