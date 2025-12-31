import React, { useState } from 'react';
import { Container, Typography, Box } from '@mui/material';
import { useMovies } from '../context/MovieContext';
import MovieList from '../components/MovieList';
import Pagination from '../components/Pagination';
import SearchBar from '../components/SearchBar';

const Search = () => {
  const { movies, loading, pagination, searchMovies } = useMovies();
  const [query, setQuery] = useState('');

  const handleSearch = (q) => {
    setQuery(q);
    searchMovies(q, 1);  // 🔥 CALL CONTEXT SEARCH
  };

  const handlePageChange = (page) => {
    searchMovies(query, page);  // 🔥 Pagination works
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Search Movies
      </Typography>

      <SearchBar onSearch={handleSearch} />

      <MovieList movies={movies} loading={loading} />

      {movies.length > 0 && pagination.totalPages > 1 && (
        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            onPageChange={handlePageChange}
          />
        </Box>
      )}
    </Container>
  );
};

export default Search;
