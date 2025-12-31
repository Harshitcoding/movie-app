import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
} from '@mui/material';
import { useMovies } from '../context/MovieContext';
import MovieList from '../components/MovieList';
import Pagination from '../components/Pagination';

const Home = () => {
  const { movies, loading, pagination, fetchMovies, fetchSortedMovies } = useMovies();
  const [sortBy, setSortBy] = useState('title');
  const [order, setOrder] = useState('asc');

  // ✅ FIX: Only run once on mount
  useEffect(() => {
    fetchMovies(1);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSortChange = (e) => {
    const newSortBy = e.target.value;
    setSortBy(newSortBy);
    fetchSortedMovies(newSortBy, order, 1);
  };

  const handleOrderChange = (e) => {
    const newOrder = e.target.value;
    setOrder(newOrder);
    fetchSortedMovies(sortBy, newOrder, 1);
  };

  const handlePageChange = (page) => {
    if (sortBy === 'title' && order === 'asc') {
      fetchMovies(page);
    } else {
      fetchSortedMovies(sortBy, order, page);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Movie Collection
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Browse through our collection of {pagination.totalMovies} movies
        </Typography>
      </Box>

      <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Sort Movies
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Sort By</InputLabel>
            <Select value={sortBy} onChange={handleSortChange} label="Sort By">
              <MenuItem value="title">Title</MenuItem>
              <MenuItem value="rating">Rating</MenuItem>
              <MenuItem value="releaseDate">Release Date</MenuItem>
              <MenuItem value="duration">Duration</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel>Order</InputLabel>
            <Select value={order} onChange={handleOrderChange} label="Order">
              <MenuItem value="asc">Ascending</MenuItem>
              <MenuItem value="desc">Descending</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Paper>

      <MovieList movies={movies} loading={loading} />

      {!loading && movies.length > 0 && (
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </Container>
  );
};

export default Home;