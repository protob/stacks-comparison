/**
 * Composable for generating public URLs for asset files.
 */
export function useFileUrl() {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
  const ASSETS_ROOT_PATH = '/run/media/dtb/DATA/dam-assets'; // Must match backend config

  /**
   * Converts an absolute server file path into a public URL.
   * @param absolutePath The full file path from the API (e.g., /run/media/...)
   * @returns A working URL (e.g., http://localhost:3000/files/suno/...)
   */
  const getFileUrl = (absolutePath: string | null | undefined): string => {
    // Handle null, undefined, or non-string values
    if (!absolutePath || typeof absolutePath !== 'string') {
      return '';
    }

    // Remove the server's root asset path to get the relative path
    const relativePath = absolutePath.replace(ASSETS_ROOT_PATH, '');

    // Construct the full URL to the backend's /files/ endpoint
    return `${API_BASE_URL}/files${relativePath}`;
  };

  return {
    getFileUrl,
  };
}