package common

import (
	"fmt"
	"os"
	"path/filepath"

	"gopkg.in/yaml.v3"
)

// EnsureDir creates a directory if it doesn't exist
func EnsureDir(dirPath string) error {
	err := os.MkdirAll(dirPath, 0755)
	if err != nil {
		return fmt.Errorf("failed to ensure directory %s: %w", dirPath, err)
	}
	return nil
}

// WriteYAML writes the given data structure as YAML to the specified file path
func WriteYAML(filePath string, data interface{}) error {
	yamlData, err := yaml.Marshal(data)
	if err != nil {
		return fmt.Errorf("failed to marshal YAML for %s: %w", filePath, err)
	}

	if err := EnsureDir(filepath.Dir(filePath)); err != nil {
		return err
	}

	err = os.WriteFile(filePath, yamlData, 0644)
	if err != nil {
		return fmt.Errorf("failed to write YAML file %s: %w", filePath, err)
	}
	return nil
}

// ReadYAML reads a YAML file from the specified path into the given data structure
func ReadYAML(filePath string, data interface{}) error {
	yamlFile, err := os.ReadFile(filePath)
	if err != nil {
		if os.IsNotExist(err) {
			return fmt.Errorf("common.ReadYAML %w: %s", ErrNotFound, filePath)
		}
		return fmt.Errorf("failed to read YAML file %s: %w", filePath, err)
	}

	err = yaml.Unmarshal(yamlFile, data)
	if err != nil {
		return fmt.Errorf("failed to unmarshal YAML file %s: %w", filePath, err)
	}
	return nil
}

// RemoveFile removes a file if it exists
func RemoveFile(filePath string) error {
	err := os.Remove(filePath)
	if err != nil && !os.IsNotExist(err) {
		return fmt.Errorf("failed to remove file %s: %w", filePath, err)
	}
	return nil
}

// RemoveDir removes a directory if it exists
func RemoveDir(dirPath string) error {
	err := os.RemoveAll(dirPath)
	if err != nil && !os.IsNotExist(err) {
		return fmt.Errorf("failed to remove directory %s: %w", dirPath, err)
	}
	return nil
}

// ListDirs returns a list of directory names in the given path
func ListDirs(dirPath string) ([]string, error) {
	if _, err := os.Stat(dirPath); os.IsNotExist(err) {
		return []string{}, nil
	}

	entries, err := os.ReadDir(dirPath)
	if err != nil {
		return nil, fmt.Errorf("failed to read directory %s: %w", dirPath, err)
	}

	var dirs []string
	for _, entry := range entries {
		if entry.IsDir() {
			dirs = append(dirs, entry.Name())
		}
	}

	return dirs, nil
}
