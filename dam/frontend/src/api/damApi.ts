import api from './axios'; // <-- IMPORT new centralized instance
import type { Collection, Project, Idea, Song, ScanResult, Track } from '@/types/dam-api';

// Re-export types for convenience
export type { Collection, Project, Idea, Song, Track, ScanResult };

// Scanner API
export const scannerApi = {
  scanSuno: async (): Promise<ScanResult> => {
    // Scanning can take a long time with thousands of tracks, so we use a longer timeout
    const response = await api.post('/scanner/suno', {}, { timeout: 600000 }); // 10 minutes
    return response.data;
  },

  scanUdio: async (): Promise<ScanResult> => {
    // Scanning can take a long time with thousands of tracks, so we use a longer timeout
    const response = await api.post('/scanner/udio', {}, { timeout: 600000 }); // 10 minutes
    return response.data;
  },

  dropDatabase: async (confirmation: string): Promise<{ message: string }> => {
    const response = await api.post('/scanner/drop-database', { confirmation });
    return response.data;
  },
};

// Collections API
export const collectionsApi = {
  list: async (): Promise<Collection[]> => {
    const response = await api.get('/collections');
    return response.data.collections || [];
  },

  get: async (id: string): Promise<Collection> => {
    const response = await api.get(`/collections/${id}`);
    return response.data.collection;
  },

  create: async (data: {
    name: string;
    description?: string;
    tags?: string[];
    state?: string;
  }): Promise<Collection> => {
    const response = await api.post('/collections', data);
    return response.data.collection;
  },

  update: async (
    id: string,
    data: Partial<{
      name: string;
      description: string;
      tags: string[];
      state: string;
    }>
  ): Promise<Collection> => {
    const response = await api.patch(`/collections/${id}`, data);
    return response.data.collection;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/collections/${id}`);
  },

  addTrack: async (collectionId: string, trackId: string): Promise<void> => {
    await api.post(`/collections/${collectionId}/tracks`, {
      track_id: trackId,
    });
  },

  removeTrack: async (collectionId: string, trackId: string): Promise<void> => {
    await api.delete(`/collections/${collectionId}/tracks/${trackId}`);
  },

  getTracks: async (collectionId: string): Promise<Track[]> => {
    const response = await api.get(`/collections/${collectionId}/tracks`);
    return response.data.tracks || [];
  },

  listProjects: async (collectionId: string): Promise<Project[]> => {
    const response = await api.get(`/collections/${collectionId}/projects`);
    return response.data.projects || [];
  },
};

// Projects API
export const projectsApi = {
  list: async (): Promise<Project[]> => {
    const response = await api.get('/projects');
    return response.data.projects || [];
  },

  listByCollection: async (collectionId: string): Promise<Project[]> => {
    const response = await api.get(`/collections/${collectionId}/projects`);
    return response.data.projects || [];
  },

  get: async (id: string): Promise<Project> => {
    const response = await api.get(`/projects/${id}`);
    return response.data.project;
  },

  create: async (data: {
    name: string;
    collection_id: string;
    description?: string;
    tags?: string[];
    state?: string;
    mood?: string;
  }): Promise<Project> => {
    const response = await api.post('/projects', data);
    return response.data.project;
  },

  update: async (
    id: string,
    data: Partial<{
      name: string;
      description: string;
      collection_id: string;
      tags: string[];
      state: string;
      mood: string;
    }>
  ): Promise<Project> => {
    const response = await api.patch(`/projects/${id}`, data);
    return response.data.project;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/projects/${id}`);
  },

  listIdeas: async (projectId: string): Promise<Idea[]> => {
    const response = await api.get(`/projects/${projectId}/ideas`);
    return response.data.ideas || [];
  },
};

// Ideas API
export const ideasApi = {
  list: async (): Promise<Idea[]> => {
    const response = await api.get('/ideas');
    return response.data.ideas || [];
  },

  listByProject: async (projectId: string): Promise<Idea[]> => {
    const response = await api.get(`/projects/${projectId}/ideas`);
    return response.data.ideas || [];
  },

  get: async (id: string): Promise<Idea> => {
    const response = await api.get(`/ideas/${id}`);
    return response.data.idea;
  },

  create: async (data: {
    name: string;
    project_id: string;
    description?: string;
    tags?: string[];
    state?: string;
    reference_notes?: string;
  }): Promise<Idea> => {
    const response = await api.post('/ideas', data);
    return response.data.idea;
  },

  update: async (
    id: string,
    data: Partial<{
      name: string;
      description: string;
      tags: string[];
      state: string;
      reference_notes: string;
    }>
  ): Promise<Idea> => {
    const response = await api.patch(`/ideas/${id}`, data);
    return response.data.idea;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/ideas/${id}`);
  },

  listSongs: async (ideaId: string): Promise<Song[]> => {
    const response = await api.get(`/ideas/${ideaId}/songs`);
    return response.data.songs || [];
  },
};

// Songs API
export const songsApi = {
  list: async (): Promise<Song[]> => {
    const response = await api.get('/songs');
    return response.data.songs || [];
  },

  listByIdea: async (ideaId: string): Promise<Song[]> => {
    const response = await api.get(`/ideas/${ideaId}/songs`);
    return response.data.songs || [];
  },

  get: async (id: string): Promise<Song> => {
    const response = await api.get(`/songs/${id}`);
    return response.data.song;
  },

  create: async (data: {
    name: string;
    idea_id: string;
    description?: string;
    tags?: string[];
    state?: string;
    version?: string;
  }): Promise<Song> => {
    const response = await api.post('/songs', data);
    return response.data.song;
  },

  update: async (
    id: string,
    data: Partial<{
      name: string;
      description: string;
      tags: string[];
      state: string;
      version: string;
    }>
  ): Promise<Song> => {
    const response = await api.patch(`/songs/${id}`, data);
    return response.data.song;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/songs/${id}`);
  },

  listTracks: async (songId: string): Promise<Track[]> => {
    const response = await api.get(`/songs/${songId}/tracks`);
    return response.data.tracks || [];
  },
};

// Tracks API
export const tracksApi = {
  list: async (): Promise<Track[]> => {
    const response = await api.get('/tracks');
    return response.data.tracks || [];
  },

  get: async (
    id: string
  ): Promise<{
    track: Track;
    collections: Collection[];
    in_any_collection: boolean;
  }> => {
    const response = await api.get(`/tracks/${id}`);
    return response.data;
  },

  update: async (
    id: string,
    data: Partial<{
      title: string;
      rating: number;
      is_trash: boolean;
      artist_tags: string[];
      album_tags: string[];
      genre_tags: string[];
      mood_tags: string[];
      tags: string[];
    }>
  ): Promise<Track> => {
    const response = await api.patch(`/tracks/${id}`, data);
    return response.data.track;
  },

  updateRating: async (id: string, rating: number): Promise<Track> => {
    const response = await api.patch(`/tracks/${id}/rating`, { rating });
    return response.data.track;
  },

  delete: async (id: string, hardDelete: boolean = false): Promise<void> => {
    await api.delete(`/tracks/${id}`, {
      params: { hard_delete: hardDelete },
    });
  },

  assignToSong: async (id: string, songId: string | null): Promise<Track> => {
    const response = await api.patch(`/tracks/${id}/song`, {
      song_id: songId,
    });
    return response.data.track;
  },

  bulkAssignToSong: async (trackIds: string[], songId: string | null): Promise<{success: boolean, updated_count: number}> => {
    const response = await api.post('/tracks/bulk-assign-song', {
      track_ids: trackIds,
      song_id: songId,
    });
    return response.data;
  },
};

// Workspace API
export const workspaceApi = {
  getTree: async (): Promise<{ tree: any[] }> => {
    const response = await api.get('/workspace/tree');
    return response.data;
  },

  listSunoFolder: async (
    folder: string
  ): Promise<{
    tracks: Track[];
    folder: string;
  }> => {
    const response = await api.get(`/workspace/suno/${folder}`);
    return response.data;
  },

  listUdioPath: async (
    path: string
  ): Promise<{
    tracks: Track[];
    path: string;
  }> => {
    const response = await api.get(`/workspace/udio/${path}`);
    return response.data;
  },
};

// Download API
export const downloadApi = {
  collection: async (id: string): Promise<void> => {
    const response = await api.get(`/collections/${id}/download`, {
      responseType: 'blob',
      timeout: 600000, // 10 minutes for large collections
    });

    // Create download link
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `collection-${id}.zip`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  },

  project: async (id: string): Promise<void> => {
    const response = await api.get(`/projects/${id}/download`, {
      responseType: 'blob',
      timeout: 600000, // 10 minutes for large projects
    });

    // Create download link
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `project-${id}.zip`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  },

  idea: async (id: string): Promise<void> => {
    const response = await api.get(`/ideas/${id}/download`, {
      responseType: 'blob',
      timeout: 600000, // 10 minutes for large ideas
    });

    // Create download link
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `idea-${id}.zip`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  },

  song: async (id: string): Promise<void> => {
    const response = await api.get(`/songs/${id}/download`, {
      responseType: 'blob',
      timeout: 600000, // 10 minutes for large songs
    });

    // Create download link
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `song-${id}.zip`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  },
};