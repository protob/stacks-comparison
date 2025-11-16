package services

import (
	"fmt"
	"io"
	"os"
	"path/filepath"
	"dam-backend/internal/config"
	"dam-backend/internal/constants"

	"github.com/google/uuid"
)

type FileStorageService struct {
	basePath  string  // For images and general assets
	audioPath string  // For audio files
}

func NewFileStorageService(cfg *config.Config) *FileStorageService {
	// Images in DATA_PATH
	basePath := filepath.Join(cfg.DataPath, constants.AssetsDir)
	os.MkdirAll(filepath.Join(basePath, constants.ImagesDir), 0755)

	// Audio in AssetsPath (Suno/Udio files)
	audioPath := filepath.Join(cfg.AssetsPath, "tracks")
	os.MkdirAll(audioPath, 0755)

	return &FileStorageService{
		basePath:  basePath,
		audioPath: audioPath,
	}
}

// SaveFile saves a file to the appropriate asset directory and returns the storage key.
func (s *FileStorageService) SaveFile(file io.Reader, fileType, originalFilename string) (string, error) {
	ext := filepath.Ext(originalFilename)
	filename := fmt.Sprintf("%s%s", uuid.NewString(), ext)

	var targetPath string
	var storageKey string

	if fileType == "image" {
		// Images: store in basePath (DATA_PATH/assets/img/)
		storageKey = filepath.Join(constants.ImagesDir, filename)
		targetPath = filepath.Join(s.basePath, storageKey)
	} else if fileType == "audio" {
		// Audio: store in audioPath (AUDIO_PATH/tracks/)
		// Storage key is relative: "tracks/uuid.mp3"
		storageKey = filepath.Join("tracks", filename)
		targetPath = filepath.Join(s.audioPath, filename)
	} else {
		return "", fmt.Errorf("unsupported file type: %s", fileType)
	}

	out, err := os.Create(targetPath)
	if err != nil {
		return "", fmt.Errorf("failed to create file: %w", err)
	}
	defer out.Close()

	_, err = io.Copy(out, file)
	if err != nil {
		return "", fmt.Errorf("failed to save file content: %w", err)
	}

	return storageKey, nil
}

// DeleteFile removes a file from storage using its storage key
func (s *FileStorageService) DeleteFile(storageKey string) error {
	// Determine if this is an audio file or image file based on path
	var filePath string
	if filepath.Dir(storageKey) == "tracks" {
		// Audio file: remove from audioPath
		filename := filepath.Base(storageKey)
		filePath = filepath.Join(s.audioPath, filename)
	} else {
		// Image or other: remove from basePath
		filePath = filepath.Join(s.basePath, storageKey)
	}
	return os.Remove(filePath)
}

// FileExists checks if a file exists in storage
func (s *FileStorageService) FileExists(storageKey string) bool {
	// Determine if this is an audio file or image file based on path
	var filePath string
	if filepath.Dir(storageKey) == "tracks" {
		// Audio file: check in audioPath
		filename := filepath.Base(storageKey)
		filePath = filepath.Join(s.audioPath, filename)
	} else {
		// Image or other: check in basePath
		filePath = filepath.Join(s.basePath, storageKey)
	}
	_, err := os.Stat(filePath)
	return !os.IsNotExist(err)
}
