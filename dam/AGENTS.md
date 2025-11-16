# Claude Development Guidelines
## IMPORTANT: Always output file trees using ASCII characters ONLY.
Use this format:
|-- folder/
|   |-- file.txt
|   |-- subfolder/
|       +-- nested.txt
+-- another/

Never use Unicode box-drawing characters like ├─└│. They get corrupted in Claude Code.



## Directory Structure

This project has a clear separation between backend and frontend:

- **Backend**: All Go/Golang operations must be run from `./backend/` directory
- **Frontend**: All Vue/Node.js operations must be run from `./frontend/` directory

## Backend Operations (Go)

**Always run from `./backend/` directory:**
- ALWAYS use `cd backend && go run cmd/server/main.go` format
- NEVER run backend commands from project root
- Prefix ALL backend commands with: cd backend &&

```bash
go build -o dam-api ./cmd/server  # Build backend to test compilation
sqlc generate                      # Generate database code
sqlite3 data/dam.db "..."          # Database operations
```

**IMPORTANT**: Never start the server yourself. The user runs the dev server with `air` which has auto-reload. Only use `go build` to test that the code compiles without errors.

## Frontend Operations (Vue/Node.js)

```bash
cd frontend
bun run dev                        # Start dev server
bun run build                      # Build for production
bun install                        # Install dependencies
```

## Database Location

- Database file: `./backend/data/dam.db`
- Static assets: `./backend/data/assets/`

## API Endpoints

- Backend server: `http://localhost:3000`
- Frontend dev server: `http://localhost:5173`
- API base URL: `http://localhost:3000/api`

## Common Commands

### Backend
```bash
cd backend && go run cmd/server/main.go &
cd backend && sqlc generate
cd backend && go build -o dam-api ./cmd/server
```

### Frontend
```bash
cd frontend && bun run dev
cd frontend && bun run build
```

## File Paths

When referencing files in tool calls, always use absolute paths:
- Backend: `/home/dtb/0-dev/00--oct-2025/dam/backend/...`
- Frontend: `/home/dtb/0-dev/00--oct-2025/dam/frontend/...`

## Testing

- Backend tests: Run from `./backend/` directory
- Frontend tests: Run from `./frontend/` directory

## Important Notes

- Never run Go commands from project root - always `cd backend` first
- Never run bun commands from project root - always `cd frontend` first
- The backend serves static files from `/assets` endpoint
- Frontend proxy requests to backend via Vite configuration


---------
