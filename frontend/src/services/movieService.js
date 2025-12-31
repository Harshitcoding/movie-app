import api from './api';
import { API_URL } from '../config';
const movieService = {
  // Get all movies with pagination
  getMovies: async (page = 1, limit = 10) => {
    const response = await api.get(`${API_URL}/api/movies?page=${page}&limit=${limit}`);
    return response.data;
  },

  // Get sorted movies
  getSortedMovies: async (sortBy = 'title', order = 'asc', page = 1, limit = 10) => {
    const response = await api.get(
      `${API_URL}/api/movies/sorted?sortBy=${sortBy}&order=${order}&page=${page}&limit=${limit}`
    );
    return response.data;
  },

  // Search movies
  searchMovies: async (query, page = 1, limit = 10) => {
    const response = await api.get(
      `${API_URL}/api/movies/search?query=${query}&page=${page}&limit=${limit}`
    );
    return response.data;
  },

  // Get single movie
  getMovieById: async (id) => {
    const response = await api.get(`${API_URL}/api/movies/${id}`);
    return response.data;
  },

  // Add movie (admin only)
  addMovie: async (movieData) => {
    const response = await api.post(`${API_URL}/api/movies`, movieData);
    return response.data;
  },

  // Update movie (admin only)
  updateMovie: async (id, movieData) => {
    const response = await api.put(`${API_URL}/api/movies/${id}`, movieData);
    return response.data;
  },

  // Delete movie (admin only)
  deleteMovie: async (id) => {
    const response = await api.delete(`${API_URL}/api/movies/${id}`);
    return response.data;
  },
};

export default movieService;
