import React from 'react';
import { Grid, Box, CircularProgress, Typography } from '@mui/material';
import MovieCard from './MovieCard';

const MovieList = ({ movies, loading }) => {
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (!movies || movies.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h5" color="text.secondary">
          No movies found
        </Typography>
      </Box>
    );
  }

  return (
     <Grid 
    container 
    spacing={3} 
    justifyContent="center"        // ⭐ THIS CENTERS THE CARDS
  >
    {movies.map((movie) => (
      <Grid 
        item 
        xs={12} 
        sm={6} 
        md={4} 
        lg={3} 
        key={movie._id}
        sx={{ display: 'flex', justifyContent: 'center' }}  // keeps each card centered
      >
        <MovieCard movie={movie} />
      </Grid>
    ))}
  </Grid>
  );
};

export default MovieList;