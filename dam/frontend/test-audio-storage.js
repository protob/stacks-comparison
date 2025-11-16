/**
 * DAM - IndexedDB Audio Verification Snippet
 *
 * To use:
 * 1. Open your browser's Developer Tools (F12 or Ctrl+Shift+I).
 * 2. Go to the "Console" tab.
 * 3. Copy and paste the entire content of this file into the console and press Enter.
 *
 * It will list all audio tracks found in the browser's IndexedDB storage.
 */
(async function verifyAudioStorage() {
  try {
    const db = await new Promise((resolve, reject) => {
      const request = indexedDB.open('keyval-store');
      request.onerror = () => reject("Failed to open IndexedDB. Is your browser blocking it?");
      request.onsuccess = () => resolve(request.result);
    });

    const transaction = db.transaction('keyval', 'readonly');
    const store = transaction.objectStore('keyval');
    const request = store.getAllKeys();

    request.onsuccess = () => {
      const audioKeys = request.result.filter(key => key && key.startsWith('track-audio-'));

      if (audioKeys.length === 0) {
        console.log('%cNo audio tracks found in IndexedDB storage.', 'color: orange; font-weight: bold;');
        return;
      }

      console.log(`%cFound ${audioKeys.length} audio track(s) in IndexedDB:`, 'color: green; font-weight: bold;');

      audioKeys.forEach(key => {
        const trackId = key.replace('track-audio-', '');
        const getReq = store.get(key);
        getReq.onsuccess = () => {
          const file = getReq.result;
          if (file instanceof File) {
            console.log(`- Track ID: ${trackId}, File: ${file.name}, Size: ${(file.size / 1024).toFixed(2)} KB, Type: ${file.type}`);
          } else {
             console.log(`- Track ID: ${trackId}, Data: (not a file)`);
          }
        };
      });
    };

    request.onerror = () => {
      console.error("Failed to read keys from IndexedDB.");
    };

  } catch (e) {
    console.error("An error occurred:", e);
  }
})();