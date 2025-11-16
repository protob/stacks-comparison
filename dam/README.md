# DAM - Digital Audio Manager

A personal music curation and pre-staging application for managing AI-generated music from Suno and Udio.

## Status: In Development

**Current Phase:** Phase 0 Complete (Cleanup & Renaming)

## Architecture

**Workspace vs Library - Files NEVER Move**
- Workspace = File system browser showing `/dam-assets` structure
- Library = Virtual organization (Collections/Projects/Ideas/Songs)
- Files stay in their original location - only metadata changes

## Quick Start

### Prerequisites
- Node.js 20.19.0 or >=22.12.0
- Go 1.25 or later
- Air (for backend live reload): `go install github.com/cosmtrek/air@latest`

### Backend Setup
```bash
cd backend
go mod download
go run ./cmd/server/main.go
```

### Frontend Setup
```bash
cd frontend
npm install  # or bun install
npm run dev
```

## Implementation Phases

- ✅ **Phase 0**: Cleanup & Renaming (DONE)
- ⏳ **Phase 1**: Database Schema & Configuration
- ⏳ **Phase 2**: Backend Services (Scanner, Collections, Tracks)
- ⏳ **Phase 3**: Frontend Foundation (Workspace UI)
- ⏳ **Phase 4**: Complete Views (Track Detail, Library, Scanner)
- ⏳ **Phase 5**: Polish & Features

## Documentation

See `0_notes/` directory for:
- Implementation tasks (`tasks/task-101*.md`)
- Architecture proposal (`dam/proposal.md`)
- NAM compatibility guide



in canse of strnmage charater errors use this to fix

```
perl -pi.bak -e 's/\x1c\x00\x00/├── /g; s/\x14\x00\x00/└── /g; s/\x02/│/g' TODO.md

```