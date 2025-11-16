import axios from 'axios';

// Get base URL from environment variables, defaulting to correct backend address.
// This is SINGLE SOURCE OF TRUTH for backend URL.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL: `${API_BASE_URL}/api`, // All requests will now be prefixed with /api
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 600000, // 10 minutes (scan operations can take a long time)
});

export default api;