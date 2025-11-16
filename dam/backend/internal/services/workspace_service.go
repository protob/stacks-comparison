package services

import (
	"dam-backend/internal/config"
	"os"
	"path/filepath"
	"sort"
	"strconv"
	"strings"
)

type TreeNode struct {
	ID       string      `json:"id"`
	Label    string      `json:"label"`
	Type     string      `json:"type"`
	Path     string      `json:"path"` // Full path for navigation (e.g., "udio/2024/uk-grime")
	Children []*TreeNode `json:"children,omitempty"`
}

type WorkspaceService struct {
	cfg *config.Config
}

func NewWorkspaceService(cfg *config.Config) *WorkspaceService {
	return &WorkspaceService{cfg: cfg}
}

func (s *WorkspaceService) GetWorkspaceTree() ([]*TreeNode, error) {
	rootNodes := []*TreeNode{
		{ID: "suno", Label: "Suno", Type: "source", Path: "suno"},
		{ID: "udio", Label: "Udio", Type: "source", Path: "udio"},
	}

	sunoPath := filepath.Join(s.cfg.AssetsPath, "suno", "output")
	sunoChildren, _ := s.scanSunoDirectory(sunoPath, "suno")
	rootNodes[0].Children = sunoChildren

	udioPath := filepath.Join(s.cfg.AssetsPath, "udio", "sorted")
	udioChildren, _ := s.scanRecursiveDirectory(udioPath, "udio", "udio")
	rootNodes[1].Children = udioChildren

	return rootNodes, nil
}

// scanSunoDirectory has special logic to stop at numbered folders.
func (s *WorkspaceService) scanSunoDirectory(dirPath string, pathPrefix string) ([]*TreeNode, error) {
	entries, err := os.ReadDir(dirPath)
	if err != nil {
		return nil, err
	}

	var children []*TreeNode
	for _, entry := range entries {
		if entry.IsDir() {
			// For Suno, we treat the numbered folders as leaf nodes for navigation
			children = append(children, &TreeNode{
				ID:    "suno-" + entry.Name(),
				Label: entry.Name(),
				Type:  "folder",
				Path:  pathPrefix + "/" + entry.Name(),
			})
		}
	}

	// Sort numerically
	sort.Slice(children, func(i, j int) bool {
		numA, errA := strconv.Atoi(children[i].Label)
		numB, errB := strconv.Atoi(children[j].Label)
		if errA == nil && errB == nil {
			return numA < numB
		}
		// Fallback to string sort if not numbers
		return children[i].Label < children[j].Label
	})

	return children, nil
}

// scanRecursiveDirectory is for deeply nested structures like Udio.
func (s *WorkspaceService) scanRecursiveDirectory(dirPath, idPrefix, pathPrefix string) ([]*TreeNode, error) {
	entries, err := os.ReadDir(dirPath)
	if err != nil {
		return nil, err
	}

	var children []*TreeNode
	for _, entry := range entries {
		if entry.IsDir() {
			nodeName := entry.Name()
			nodeID := idPrefix + "-" + strings.ReplaceAll(nodeName, " ", "_") // Sanitize ID
			nodePath := pathPrefix + "/" + nodeName // Preserve actual folder name with dashes

			childNode := &TreeNode{
				ID:    nodeID,
				Label: nodeName,
				Type:  "folder",
				Path:  nodePath,
			}

			subDirPath := filepath.Join(dirPath, nodeName)
			subChildren, err := s.scanRecursiveDirectory(subDirPath, nodeID, nodePath)
			if err == nil && len(subChildren) > 0 {
				childNode.Children = subChildren
			}
			children = append(children, childNode)
		}
	}

	sort.Slice(children, func(i, j int) bool {
		return strings.ToLower(children[i].Label) < strings.ToLower(children[j].Label)
	})

	return children, nil
}
