package api

import (
	"archive/zip"
	"dam-backend/internal/db"
	"dam-backend/internal/services"
	"encoding/json"
	"net/http"

	"github.com/go-chi/chi/v5"
)

// SetupDAMAPI registers all DAM API operations
func SetupDAMAPI(router chi.Router,
	scannerService *services.ScannerService,
	collectionService *services.CollectionService,
	projectService *services.ProjectService,
	ideaService *services.IdeaService,
	songService *services.SongService,
	trackService *services.TrackService,
	workspaceService *services.WorkspaceService,
	downloadService *services.DownloadService) {

	RegisterScannerOperations(router, scannerService)
	RegisterCollectionOperations(router, collectionService)
	RegisterProjectOperations(router, projectService)
	RegisterIdeaOperations(router, ideaService)
	RegisterSongOperations(router, songService)
	RegisterTrackOperations(router, trackService)
	RegisterWorkspaceOperations(router, workspaceService, trackService)
	RegisterDownloadOperations(router, downloadService)
}

// Scanner Operations
func RegisterScannerOperations(router chi.Router, service *services.ScannerService) {
	// CORRECTED: Path is now relative to the /api group
	router.Post("/scanner/suno", func(w http.ResponseWriter, r *http.Request) {
		result, err := service.ScanSunoFolders(r.Context())
		if err != nil {
			respondError(w, http.StatusInternalServerError, "Failed to scan Suno folders: "+err.Error())
			return
		}
		respondJSON(w, http.StatusOK, result)
	})

	// CORRECTED: Path is now relative to the /api group
	router.Post("/scanner/udio", func(w http.ResponseWriter, r *http.Request) {
		result, err := service.ScanUdioFolders(r.Context())
		if err != nil {
			respondError(w, http.StatusInternalServerError, "Failed to scan Udio folders: "+err.Error())
			return
		}
		respondJSON(w, http.StatusOK, result)
	})

	// Drop database endpoint
	router.Post("/scanner/drop-database", func(w http.ResponseWriter, r *http.Request) {
		// Require confirmation phrase
		var input struct {
			Confirmation string `json:"confirmation"`
		}
		if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
			respondError(w, http.StatusBadRequest, "Invalid request body")
			return
		}

		if input.Confirmation != "iamsure" {
			respondError(w, http.StatusBadRequest, "Invalid confirmation phrase")
			return
		}

		err := service.DropDatabase(r.Context())
		if err != nil {
			respondError(w, http.StatusInternalServerError, "Failed to drop database: "+err.Error())
			return
		}

		respondJSON(w, http.StatusOK, map[string]string{"message": "Database dropped successfully"})
	})
}

// Collection Operations
func RegisterCollectionOperations(router chi.Router, service *services.CollectionService) {
	// CORRECTED: Path is now relative to the /api group
	router.Post("/collections", func(w http.ResponseWriter, r *http.Request) {
		var input services.CreateCollectionInput
		if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
			respondError(w, http.StatusBadRequest, "Invalid request body: "+err.Error())
			return
		}

		collection, err := service.CreateCollection(r.Context(), input)
		if err != nil {
			respondError(w, http.StatusInternalServerError, "Failed to create collection: "+err.Error())
			return
		}
		respondJSON(w, http.StatusCreated, map[string]interface{}{"collection": ToCollectionResponse(*collection)})
	})

	// CORRECTED: Path is now relative to the /api group
	router.Get("/collections", func(w http.ResponseWriter, r *http.Request) {
		collections, err := service.ListCollections(r.Context())
		if err != nil {
			respondError(w, http.StatusInternalServerError, "Failed to list collections: "+err.Error())
			return
		}
		// Convert to response types
		respCollections := make([]CollectionResponse, len(collections))
		for i, c := range collections {
			respCollections[i] = ToCollectionResponse(c)
		}
		respondJSON(w, http.StatusOK, map[string]interface{}{"collections": respCollections})
	})

	// CORRECTED: Path is now relative to the /api group
	router.Get("/collections/{id}", func(w http.ResponseWriter, r *http.Request) {
		id := chi.URLParam(r, "id")
		collection, err := service.GetCollection(r.Context(), id)
		if err != nil {
			respondError(w, http.StatusNotFound, "Collection not found")
			return
		}
		respondJSON(w, http.StatusOK, map[string]interface{}{"collection": ToCollectionResponse(*collection)})
	})

	// Update collection
	router.Patch("/collections/{id}", func(w http.ResponseWriter, r *http.Request) {
		id := chi.URLParam(r, "id")
		var input services.UpdateCollectionInput
		if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
			respondError(w, http.StatusBadRequest, "Invalid request body: "+err.Error())
			return
		}

		collection, err := service.UpdateCollection(r.Context(), id, input)
		if err != nil {
			respondError(w, http.StatusInternalServerError, "Failed to update collection: "+err.Error())
			return
		}
		respondJSON(w, http.StatusOK, map[string]interface{}{"collection": ToCollectionResponse(*collection)})
	})

	// Delete collection
	router.Delete("/collections/{id}", func(w http.ResponseWriter, r *http.Request) {
		id := chi.URLParam(r, "id")
		err := service.DeleteCollection(r.Context(), id)
		if err != nil {
			respondError(w, http.StatusInternalServerError, "Failed to delete collection: "+err.Error())
			return
		}
		respondJSON(w, http.StatusOK, map[string]interface{}{"success": true})
	})

	// CORRECTED: Path is now relative to the /api group
	router.Post("/collections/{id}/tracks", func(w http.ResponseWriter, r *http.Request) {
		id := chi.URLParam(r, "id")
		var input struct {
			TrackID string `json:"track_id"`
		}
		if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
			respondError(w, http.StatusBadRequest, "Invalid request body: "+err.Error())
			return
		}

		err := service.AddTrackToCollection(r.Context(), id, input.TrackID)
		if err != nil {
			respondError(w, http.StatusInternalServerError, "Failed to add track to collection: "+err.Error())
			return
		}
		respondJSON(w, http.StatusOK, map[string]interface{}{"success": true})
	})

	// CORRECTED: Path is now relative to the /api group
	router.Get("/collections/{id}/tracks", func(w http.ResponseWriter, r *http.Request) {
		id := chi.URLParam(r, "id")
		tracks, err := service.GetCollectionTracks(r.Context(), id)
		if err != nil {
			respondError(w, http.StatusInternalServerError, "Failed to get collection tracks: "+err.Error())
			return
		}
		respondJSON(w, http.StatusOK, map[string]interface{}{"tracks": tracks})
	})

	// CORRECTED: Path is now relative to the /api group
	router.Delete("/collections/{id}/tracks/{trackId}", func(w http.ResponseWriter, r *http.Request) {
		collectionID := chi.URLParam(r, "id")
		trackID := chi.URLParam(r, "trackId")

		err := service.RemoveTrackFromCollection(r.Context(), collectionID, trackID)
		if err != nil {
			respondError(w, http.StatusInternalServerError, "Failed to remove track from collection: "+err.Error())
			return
		}
		respondJSON(w, http.StatusOK, map[string]interface{}{"success": true})
	})
}

// Project Operations
func RegisterProjectOperations(router chi.Router, service *services.ProjectService) {
	// Create project
	router.Post("/projects", func(w http.ResponseWriter, r *http.Request) {
		var input services.CreateProjectInput
		if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
			respondError(w, http.StatusBadRequest, "Invalid request body: "+err.Error())
			return
		}

		project, err := service.CreateProject(r.Context(), input)
		if err != nil {
			respondError(w, http.StatusInternalServerError, "Failed to create project: "+err.Error())
			return
		}
		respondJSON(w, http.StatusCreated, map[string]interface{}{"project": ToProjectResponse(*project)})
	})

	// List all projects
	router.Get("/projects", func(w http.ResponseWriter, r *http.Request) {
		projects, err := service.ListProjects(r.Context())
		if err != nil {
			respondError(w, http.StatusInternalServerError, "Failed to list projects: "+err.Error())
			return
		}
		respProjects := make([]ProjectResponse, len(projects))
		for i, p := range projects {
			respProjects[i] = ToProjectResponse(p)
		}
		respondJSON(w, http.StatusOK, map[string]interface{}{"projects": respProjects})
	})

	// Get project by ID
	router.Get("/projects/{id}", func(w http.ResponseWriter, r *http.Request) {
		id := chi.URLParam(r, "id")
		project, err := service.GetProject(r.Context(), id)
		if err != nil {
			respondError(w, http.StatusNotFound, "Project not found")
			return
		}
		respondJSON(w, http.StatusOK, map[string]interface{}{"project": ToProjectResponse(*project)})
	})

	// Update project
	router.Patch("/projects/{id}", func(w http.ResponseWriter, r *http.Request) {
		id := chi.URLParam(r, "id")
		var input services.UpdateProjectInput
		if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
			respondError(w, http.StatusBadRequest, "Invalid request body: "+err.Error())
			return
		}

		project, err := service.UpdateProject(r.Context(), id, input)
		if err != nil {
			respondError(w, http.StatusInternalServerError, "Failed to update project: "+err.Error())
			return
		}
		respondJSON(w, http.StatusOK, map[string]interface{}{"project": ToProjectResponse(*project)})
	})

	// Delete project
	router.Delete("/projects/{id}", func(w http.ResponseWriter, r *http.Request) {
		id := chi.URLParam(r, "id")
		err := service.DeleteProject(r.Context(), id)
		if err != nil {
			respondError(w, http.StatusInternalServerError, "Failed to delete project: "+err.Error())
			return
		}
		respondJSON(w, http.StatusOK, map[string]interface{}{"success": true})
	})

	// List projects by collection
	router.Get("/collections/{id}/projects", func(w http.ResponseWriter, r *http.Request) {
		collectionID := chi.URLParam(r, "id")
		projects, err := service.ListProjectsByCollection(r.Context(), collectionID)
		if err != nil {
			respondError(w, http.StatusInternalServerError, "Failed to list projects: "+err.Error())
			return
		}
		respProjects := make([]ProjectResponse, len(projects))
		for i, p := range projects {
			respProjects[i] = ToProjectResponse(p)
		}
		respondJSON(w, http.StatusOK, map[string]interface{}{"projects": respProjects})
	})
}

// Idea Operations
func RegisterIdeaOperations(router chi.Router, service *services.IdeaService) {
	// Create idea
	router.Post("/ideas", func(w http.ResponseWriter, r *http.Request) {
		var input services.CreateIdeaInput
		if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
			respondError(w, http.StatusBadRequest, "Invalid request body: "+err.Error())
			return
		}

		idea, err := service.CreateIdea(r.Context(), input)
		if err != nil {
			respondError(w, http.StatusInternalServerError, "Failed to create idea: "+err.Error())
			return
		}
		respondJSON(w, http.StatusCreated, map[string]interface{}{"idea": ToIdeaResponse(*idea)})
	})

	// List all ideas
	router.Get("/ideas", func(w http.ResponseWriter, r *http.Request) {
		ideas, err := service.ListIdeas(r.Context())
		if err != nil {
			respondError(w, http.StatusInternalServerError, "Failed to list ideas: "+err.Error())
			return
		}
		respIdeas := make([]IdeaResponse, len(ideas))
		for i, idea := range ideas {
			respIdeas[i] = ToIdeaResponse(idea)
		}
		respondJSON(w, http.StatusOK, map[string]interface{}{"ideas": respIdeas})
	})

	// Get idea by ID
	router.Get("/ideas/{id}", func(w http.ResponseWriter, r *http.Request) {
		id := chi.URLParam(r, "id")
		idea, err := service.GetIdea(r.Context(), id)
		if err != nil {
			respondError(w, http.StatusNotFound, "Idea not found")
			return
		}
		respondJSON(w, http.StatusOK, map[string]interface{}{"idea": ToIdeaResponse(*idea)})
	})

	// Update idea
	router.Patch("/ideas/{id}", func(w http.ResponseWriter, r *http.Request) {
		id := chi.URLParam(r, "id")
		var input services.UpdateIdeaInput
		if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
			respondError(w, http.StatusBadRequest, "Invalid request body: "+err.Error())
			return
		}

		idea, err := service.UpdateIdea(r.Context(), id, input)
		if err != nil {
			respondError(w, http.StatusInternalServerError, "Failed to update idea: "+err.Error())
			return
		}
		respondJSON(w, http.StatusOK, map[string]interface{}{"idea": ToIdeaResponse(*idea)})
	})

	// Delete idea
	router.Delete("/ideas/{id}", func(w http.ResponseWriter, r *http.Request) {
		id := chi.URLParam(r, "id")
		err := service.DeleteIdea(r.Context(), id)
		if err != nil {
			respondError(w, http.StatusInternalServerError, "Failed to delete idea: "+err.Error())
			return
		}
		respondJSON(w, http.StatusOK, map[string]interface{}{"success": true})
	})

	// List ideas by project
	router.Get("/projects/{id}/ideas", func(w http.ResponseWriter, r *http.Request) {
		projectID := chi.URLParam(r, "id")
		ideas, err := service.ListIdeasByProject(r.Context(), projectID)
		if err != nil {
			respondError(w, http.StatusInternalServerError, "Failed to list ideas: "+err.Error())
			return
		}
		respIdeas := make([]IdeaResponse, len(ideas))
		for i, idea := range ideas {
			respIdeas[i] = ToIdeaResponse(idea)
		}
		respondJSON(w, http.StatusOK, map[string]interface{}{"ideas": respIdeas})
	})
}

// Song Operations
func RegisterSongOperations(router chi.Router, service *services.SongService) {
	// Create song
	router.Post("/songs", func(w http.ResponseWriter, r *http.Request) {
		var input services.CreateSongInput
		if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
			respondError(w, http.StatusBadRequest, "Invalid request body: "+err.Error())
			return
		}

		song, err := service.CreateSong(r.Context(), input)
		if err != nil {
			respondError(w, http.StatusInternalServerError, "Failed to create song: "+err.Error())
			return
		}
		respondJSON(w, http.StatusCreated, map[string]interface{}{"song": ToSongResponse(*song)})
	})

	// List all songs
	router.Get("/songs", func(w http.ResponseWriter, r *http.Request) {
		songs, err := service.ListSongs(r.Context())
		if err != nil {
			respondError(w, http.StatusInternalServerError, "Failed to list songs: "+err.Error())
			return
		}
		respSongs := make([]SongResponse, len(songs))
		for i, song := range songs {
			respSongs[i] = ToSongResponse(song)
		}
		respondJSON(w, http.StatusOK, map[string]interface{}{"songs": respSongs})
	})

	// Get song by ID
	router.Get("/songs/{id}", func(w http.ResponseWriter, r *http.Request) {
		id := chi.URLParam(r, "id")
		song, err := service.GetSong(r.Context(), id)
		if err != nil {
			respondError(w, http.StatusNotFound, "Song not found")
			return
		}
		respondJSON(w, http.StatusOK, map[string]interface{}{"song": ToSongResponse(*song)})
	})

	// Update song
	router.Patch("/songs/{id}", func(w http.ResponseWriter, r *http.Request) {
		id := chi.URLParam(r, "id")
		var input services.UpdateSongInput
		if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
			respondError(w, http.StatusBadRequest, "Invalid request body: "+err.Error())
			return
		}

		song, err := service.UpdateSong(r.Context(), id, input)
		if err != nil {
			respondError(w, http.StatusInternalServerError, "Failed to update song: "+err.Error())
			return
		}
		respondJSON(w, http.StatusOK, map[string]interface{}{"song": ToSongResponse(*song)})
	})

	// Delete song
	router.Delete("/songs/{id}", func(w http.ResponseWriter, r *http.Request) {
		id := chi.URLParam(r, "id")
		err := service.DeleteSong(r.Context(), id)
		if err != nil {
			respondError(w, http.StatusInternalServerError, "Failed to delete song: "+err.Error())
			return
		}
		respondJSON(w, http.StatusOK, map[string]interface{}{"success": true})
	})

	// List songs by idea
	router.Get("/ideas/{id}/songs", func(w http.ResponseWriter, r *http.Request) {
		ideaID := chi.URLParam(r, "id")
		songs, err := service.ListSongsByIdea(r.Context(), ideaID)
		if err != nil {
			respondError(w, http.StatusInternalServerError, "Failed to list songs: "+err.Error())
			return
		}
		respSongs := make([]SongResponse, len(songs))
		for i, song := range songs {
			respSongs[i] = ToSongResponse(song)
		}
		respondJSON(w, http.StatusOK, map[string]interface{}{"songs": respSongs})
	})
}

// Track Operations
func RegisterTrackOperations(router chi.Router, service *services.TrackService) {
	// List all tracks (for library view - only assigned tracks)
	router.Get("/tracks", func(w http.ResponseWriter, r *http.Request) {
		// Only get tracks that are assigned to songs
		tracks, err := service.ListTracks(r.Context())
		if err != nil {
			respondError(w, http.StatusInternalServerError, "Failed to list tracks: "+err.Error())
			return
		}

		// Filter to only assigned tracks
		assignedTracks := []db.Track{}
		for _, track := range tracks {
			if track.SongID.Valid {
				assignedTracks = append(assignedTracks, track)
			}
		}

		trackResponses := make([]TrackResponse, len(assignedTracks))
		for i, track := range assignedTracks {
			trackResponses[i] = ToTrackResponse(track)
		}
		respondJSON(w, http.StatusOK, map[string]interface{}{"tracks": trackResponses})
	})

	// Get track with comment
	router.Get("/tracks/{id}", func(w http.ResponseWriter, r *http.Request) {
		id := chi.URLParam(r, "id")
		result, err := service.GetTrackWithComment(r.Context(), id)
		if err != nil {
			respondError(w, http.StatusNotFound, "Track not found")
			return
		}

		// Convert to API response (clean up sql.Null* types)
		response := TrackWithCommentResponse{
			Track: ToTrackResponse(*result.Track),
		}
		if result.Comment != nil {
			commentResp := ToTrackCommentResponse(*result.Comment)
			response.Comment = &commentResp
		}

		respondJSON(w, http.StatusOK, response)
	})

	// CORRECTED: Path is now relative to the /api group
	router.Patch("/tracks/{id}", func(w http.ResponseWriter, r *http.Request) {
		id := chi.URLParam(r, "id")
		var input services.UpdateTrackInput
		if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
			respondError(w, http.StatusBadRequest, "Invalid request body: "+err.Error())
			return
		}

		track, err := service.UpdateTrack(r.Context(), id, input)
		if err != nil {
			respondError(w, http.StatusInternalServerError, "Failed to update track: "+err.Error())
			return
		}
		respondJSON(w, http.StatusOK, map[string]interface{}{"track": track})
	})

	// Update track rating
	router.Patch("/tracks/{id}/rating", func(w http.ResponseWriter, r *http.Request) {
		id := chi.URLParam(r, "id")
		var input struct {
			Rating int `json:"rating"`
		}
		if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
			respondError(w, http.StatusBadRequest, "Invalid request body: "+err.Error())
			return
		}

		track, err := service.UpdateTrackRating(r.Context(), id, input.Rating)
		if err != nil {
			respondError(w, http.StatusBadRequest, err.Error())
			return
		}
		respondJSON(w, http.StatusOK, map[string]interface{}{"track": track})
	})

	// Upsert track comment
	router.Put("/tracks/{id}/comment", func(w http.ResponseWriter, r *http.Request) {
		id := chi.URLParam(r, "id")
		var input services.TrackCommentInput
		if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
			respondError(w, http.StatusBadRequest, "Invalid request body: "+err.Error())
			return
		}

		comment, err := service.UpsertTrackComment(r.Context(), id, input)
		if err != nil {
			respondError(w, http.StatusInternalServerError, "Failed to save comment: "+err.Error())
			return
		}
		commentResp := ToTrackCommentResponse(*comment)
		respondJSON(w, http.StatusOK, map[string]interface{}{"comment": commentResp})
	})

	// Assign track to song
	router.Patch("/tracks/{id}/song", func(w http.ResponseWriter, r *http.Request) {
		id := chi.URLParam(r, "id")
		var input struct {
			SongID *string `json:"song_id"` // nullable to allow unassignment
		}
		if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
			respondError(w, http.StatusBadRequest, "Invalid request body: "+err.Error())
			return
		}

		track, err := service.AssignTrackToSong(r.Context(), id, input.SongID)
		if err != nil {
			respondError(w, http.StatusInternalServerError, "Failed to assign track to song: "+err.Error())
			return
		}
		respondJSON(w, http.StatusOK, map[string]interface{}{"track": ToTrackResponse(*track)})
	})

	// Bulk assign tracks to song
	router.Post("/tracks/bulk-assign-song", func(w http.ResponseWriter, r *http.Request) {
		var input struct {
			TrackIDs []string `json:"track_ids"`
			SongID   *string  `json:"song_id"` // nullable to allow unassignment
		}
		if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
			respondError(w, http.StatusBadRequest, "Invalid request body: "+err.Error())
			return
		}

		if len(input.TrackIDs) == 0 {
			respondError(w, http.StatusBadRequest, "No track IDs provided")
			return
		}

		err := service.BulkAssignTracksToSong(r.Context(), input.TrackIDs, input.SongID)
		if err != nil {
			respondError(w, http.StatusInternalServerError, "Failed to bulk assign tracks: "+err.Error())
			return
		}
		respondJSON(w, http.StatusOK, map[string]interface{}{"success": true, "updated_count": len(input.TrackIDs)})
	})

	// Get tracks by song
	router.Get("/songs/{id}/tracks", func(w http.ResponseWriter, r *http.Request) {
		songID := chi.URLParam(r, "id")

		tracks, err := service.ListTracksBySong(r.Context(), songID)
		if err != nil {
			respondError(w, http.StatusInternalServerError, "Failed to get tracks: "+err.Error())
			return
		}

		trackResponses := make([]TrackResponse, len(tracks))
		for i, track := range tracks {
			trackResponses[i] = ToTrackResponse(track)
		}
		respondJSON(w, http.StatusOK, map[string]interface{}{"tracks": trackResponses})
	})

	// Delete track
	router.Delete("/tracks/{id}", func(w http.ResponseWriter, r *http.Request) {
		id := chi.URLParam(r, "id")
		hardDelete := r.URL.Query().Get("hard") == "true"

		err := service.DeleteTrack(r.Context(), id, hardDelete)
		if err != nil {
			respondError(w, http.StatusInternalServerError, "Failed to delete track: "+err.Error())
			return
		}
		respondJSON(w, http.StatusOK, map[string]interface{}{"success": true, "hard_delete": hardDelete})
	})
}

// Workspace Operations
func RegisterWorkspaceOperations(router chi.Router, workspaceService *services.WorkspaceService, trackService *services.TrackService) {
	// CORRECTED: Path is now relative to the /api group
	router.Get("/workspace/tree", func(w http.ResponseWriter, r *http.Request) {
		tree, err := workspaceService.GetWorkspaceTree()
		if err != nil {
			respondError(w, http.StatusInternalServerError, "Failed to build workspace tree: "+err.Error())
			return
		}
		respondJSON(w, http.StatusOK, map[string]interface{}{"tree": tree})
	})

	// CORRECTED: Path is now relative to the /api group
	router.Get("/workspace/suno/{folder}", func(w http.ResponseWriter, r *http.Request) {
		folder := chi.URLParam(r, "folder")
		tracks, err := trackService.ListSunoFolder(r.Context(), folder)
		if err != nil {
			respondError(w, http.StatusInternalServerError, "Failed to list tracks: "+err.Error())
			return
		}

		// Convert to API response format (no sql.Null* types)
		trackResponses := make([]TrackResponse, len(tracks))
		for i, track := range tracks {
			trackResponses[i] = ToTrackResponse(track)
		}

		respondJSON(w, http.StatusOK, map[string]interface{}{"tracks": trackResponses, "folder": folder})
	})

	// CORRECTED: Path is now relative to the /api group
	router.Get("/workspace/udio/*", func(w http.ResponseWriter, r *http.Request) {
		path := chi.URLParam(r, "*")
		tracks, err := trackService.ListUdioPath(r.Context(), path)
		if err != nil {
			respondError(w, http.StatusInternalServerError, "Failed to list tracks: "+err.Error())
			return
		}

		// Convert to API response format (no sql.Null* types)
		trackResponses := make([]TrackResponse, len(tracks))
		for i, track := range tracks {
			trackResponses[i] = ToTrackResponse(track)
		}

		respondJSON(w, http.StatusOK, map[string]interface{}{"tracks": trackResponses, "path": path})
	})
}

// Download Operations
func RegisterDownloadOperations(router chi.Router, service *services.DownloadService) {
	// Download collection as zip
	router.Get("/collections/{id}/download", func(w http.ResponseWriter, r *http.Request) {
		collectionID := chi.URLParam(r, "id")
		if collectionID == "" {
			respondError(w, http.StatusBadRequest, "Collection ID is required")
			return
		}

		// Set headers for zip download
		w.Header().Set("Content-Type", "application/zip")
		w.Header().Set("Content-Disposition", "attachment; filename=\"collection-"+collectionID+".zip\"")

		// Create zip writer
		zipWriter := zip.NewWriter(w)
		defer zipWriter.Close()

		// Generate zip
		if err := service.DownloadCollection(r.Context(), collectionID, zipWriter); err != nil {
			// If error occurs, we can't change headers anymore, so just log
			http.Error(w, "Failed to create zip: "+err.Error(), http.StatusInternalServerError)
			return
		}
	})

	// Download project as zip
	router.Get("/projects/{id}/download", func(w http.ResponseWriter, r *http.Request) {
		projectID := chi.URLParam(r, "id")
		if projectID == "" {
			respondError(w, http.StatusBadRequest, "Project ID is required")
			return
		}

		// Set headers for zip download
		w.Header().Set("Content-Type", "application/zip")
		w.Header().Set("Content-Disposition", "attachment; filename=\"project-"+projectID+".zip\"")

		// Create zip writer
		zipWriter := zip.NewWriter(w)
		defer zipWriter.Close()

		// Generate zip
		if err := service.DownloadProject(r.Context(), projectID, zipWriter); err != nil {
			http.Error(w, "Failed to create zip: "+err.Error(), http.StatusInternalServerError)
			return
		}
	})

	// Download idea as zip
	router.Get("/ideas/{id}/download", func(w http.ResponseWriter, r *http.Request) {
		ideaID := chi.URLParam(r, "id")
		if ideaID == "" {
			respondError(w, http.StatusBadRequest, "Idea ID is required")
			return
		}

		// Set headers for zip download
		w.Header().Set("Content-Type", "application/zip")
		w.Header().Set("Content-Disposition", "attachment; filename=\"idea-"+ideaID+".zip\"")

		// Create zip writer
		zipWriter := zip.NewWriter(w)
		defer zipWriter.Close()

		// Generate zip
		if err := service.DownloadIdea(r.Context(), ideaID, zipWriter); err != nil {
			http.Error(w, "Failed to create zip: "+err.Error(), http.StatusInternalServerError)
			return
		}
	})

	// Download song as zip
	router.Get("/songs/{id}/download", func(w http.ResponseWriter, r *http.Request) {
		songID := chi.URLParam(r, "id")
		if songID == "" {
			respondError(w, http.StatusBadRequest, "Song ID is required")
			return
		}

		// Set headers for zip download
		w.Header().Set("Content-Type", "application/zip")
		w.Header().Set("Content-Disposition", "attachment; filename=\"song-"+songID+".zip\"")

		// Create zip writer
		zipWriter := zip.NewWriter(w)
		defer zipWriter.Close()

		// Generate zip
		if err := service.DownloadSong(r.Context(), songID, zipWriter); err != nil {
			http.Error(w, "Failed to create zip: "+err.Error(), http.StatusInternalServerError)
			return
		}
	})
}

// Helper functions
func respondJSON(w http.ResponseWriter, status int, data interface{}) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	json.NewEncoder(w).Encode(data)
}

func respondError(w http.ResponseWriter, status int, message string) {
	respondJSON(w, status, map[string]interface{}{
		"error":   true,
		"message": message,
	})
}
