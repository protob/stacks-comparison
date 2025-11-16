package common

import (
	"errors"
)

// Define common error types
var (
	ErrNotFound     = errors.New("resource not found")
	ErrInvalidInput = errors.New("invalid input")
	ErrStorage      = errors.New("storage error")
	ErrConflict     = errors.New("resource conflict")
)

// ErrorResponse is a standard structure for JSON error responses
type ErrorResponse struct {
	Success bool   `json:"success"`
	Data    any    `json:"data"`
	Message string `json:"message,omitempty"`
	Status  int    `json:"status,omitempty"`
}

// Error implements the error interface
func (e ErrorResponse) Error() string {
	return e.Message
}

// NewErrorResponse creates a standard error response
func NewErrorResponse(message string, statusCode int) ErrorResponse {
	return ErrorResponse{
		Success: false,
		Data:    nil,
		Message: message,
		Status:  statusCode,
	}
}
