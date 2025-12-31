import React, { createContext, useState, useContext } from 'react';
import movieService from '../services/movieService';

const MovieContext = createContext();

export const useMovies = () => {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error('useMovies must be used within MovieProvider');
  }
  return context;
};

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalMovies: 0,
  });

  const fetchMovies = async (page = 1, limit = 10) => {
    setLoading(true);
    setError(null);
    try {
      const data = await movieService.getMovies(page, limit);
      setMovies(data.movies);
      setPagination({
        currentPage: data.currentPage,
        totalPages: data.totalPages,
        totalMovies: data.totalMovies,
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch movies');
    } finally {
      setLoading(false);
    }
  };

  const fetchSortedMovies = async (sortBy, order, page = 1, limit = 10) => {
    setLoading(true);
    setError(null);
    try {
      const data = await movieService.getSortedMovies(sortBy, order, page, limit);
      setMovies(data.movies);
      setPagination({
        currentPage: data.currentPage,
        totalPages: data.totalPages,
        totalMovies: data.totalMovies,
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch movies');
    } finally {
      setLoading(false);
    }
  };

  const searchMovies = async (query, page = 1, limit = 10) => {
    setLoading(true);
    setError(null);
    try {
      const data = await movieService.searchMovies(query, page, limit);
      setMovies(data.movies);
      setPagination({
        currentPage: data.currentPage,
        totalPages: data.totalPages,
        totalMovies: data.totalMovies,
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to search movies');
    } finally {
      setLoading(false);
    }
  };

  const addMovie = async (movieData) => {
    try {
      await movieService.addMovie(movieData);
      return true;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add movie');
      return false;
    }
  };

  const updateMovie = async (id, movieData) => {
    try {
      await movieService.updateMovie(id, movieData);
      return true;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update movie');
      return false;
    }
  };

  const deleteMovie = async (id) => {
    try {
      await movieService.deleteMovie(id);
      // Refresh movies after deletion
      await fetchMovies(pagination.currentPage);
      return true;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete movie');
      return false;
    }
  };

  const value = {
    movies,
    loading,
    error,
    pagination,
    fetchMovies,
    fetchSortedMovies,
    searchMovies,
    addMovie,
    updateMovie,
    deleteMovie,
  };

  return <MovieContext.Provider value={value}>{children}</MovieContext.Provider>;
};