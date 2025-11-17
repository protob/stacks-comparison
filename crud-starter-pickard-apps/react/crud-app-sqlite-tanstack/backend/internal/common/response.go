package common

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"
)

// APIResponse represents the standard API response format
type APIResponse struct {
	Success bool   `json:"success"`
	Data    any    `json:"data"`
	Message string `json:"message,omitempty"`
}

// RespondWithJSON sends a JSON response
func RespondWithJSON(w http.ResponseWriter, code int, payload interface{}) {
	w.Header().Set("Content-Type", "application/json")

	response, err := json.Marshal(payload)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error marshalling JSON response: %v\n", err)
		errResp := NewErrorResponse("Internal server error", http.StatusInternalServerError)
		errBytes, _ := json.Marshal(errResp)
		w.WriteHeader(http.StatusInternalServerError)
		w.Write(errBytes)
		return
	}

	w.WriteHeader(code)
	w.Write(response)
}

// RespondWithError sends a JSON error response
func RespondWithError(w http.ResponseWriter, errResp ErrorResponse) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(errResp.Status)

	response, err := json.Marshal(errResp)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error marshalling ErrorResponse: %v\n", err)
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		return
	}

	w.Write(response)
}

// RespondWithSuccess sends a successful JSON response
func RespondWithSuccess(w http.ResponseWriter, data interface{}, message ...string) {
	msg := ""
	if len(message) > 0 {
		msg = message[0]
	}

	response := APIResponse{
		Success: true,
		Data:    data,
		Message: msg,
	}

	RespondWithJSON(w, http.StatusOK, response)
}
