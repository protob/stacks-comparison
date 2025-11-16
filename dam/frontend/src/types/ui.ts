export interface TreeNode {
  id: string;
  label: string;
  type: 'source' | 'folder';
  path: string; // Full path for navigation (e.g., "udio/2024/uk-grime")
  children?: TreeNode[];
}