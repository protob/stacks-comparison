/**
 * PROTOTYPE ONLY: Extracts audio duration client-side.
 * TODO: Remove when backend handles media processing.
 * The backend will use a tool like ffprobe for accurate metadata extraction.
 */
export function getAudioDuration(file: File): Promise<number> {
  /**
   * Extracts the duration of an audio file in seconds.
   * @param file The audio File object.
   * @returns A promise that resolves with the duration in seconds, or 0 if it fails.
   */
  return new Promise((resolve) => {
    const audio = document.createElement('audio');
    audio.preload = 'metadata';

    audio.onloadedmetadata = () => {
      window.URL.revokeObjectURL(audio.src);
      resolve(audio.duration);
    };

    audio.onerror = () => {
      window.URL.revokeObjectURL(audio.src);
      console.error("Failed to load audio metadata for duration check.");
      resolve(0); // Resolve with 0 on error
    };

    audio.src = window.URL.createObjectURL(file);
  });
}