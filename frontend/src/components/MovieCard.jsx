import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  Box,
  Rating,
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const MovieCard = ({ movie }) => {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <Card
      sx={{
        height: 480,
        width: 320,
        display: 'flex',
        flexDirection: 'column',
        mx: 'auto', // Centers each card
        my: 2,      // Vertical spacing
        boxShadow: 3,
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 6,
        },
      }}
    >
      <CardMedia
        component="img"
        height="200" // Fixed height for uniform posters
        image={movie.posterUrl || 'https://via.placeholder.com/320x200?text=No+Image'}
        alt={movie.title}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent sx={{ flexGrow: 1, p: 2, pb: '16px !important' }}>
        <Typography 
          variant="h6" 
          component="h3" 
          sx={{ 
            mb: 1, 
            height: 48, // Fixed height prevents layout shift
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            fontWeight: 600,
          }}
        >
          {movie.title}
        </Typography>

        {/* Rating Row */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
          <Rating value={movie.rating / 2} precision={0.1} readOnly size="small" />
          <Typography variant="body2" sx={{ ml: 1, fontWeight: 500 }}>
            {movie.rating}/10
          </Typography>
        </Box>

        {/* Director */}
        <Typography 
          variant="body2" 
          color="text.secondary" 
          sx={{ mb: 1.5, fontSize: '0.875rem' }}
        >
          Director: {movie.director}
        </Typography>

        {/* Date & Duration Row */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <CalendarTodayIcon fontSize="small" color="action" />
            <Typography variant="body2" color="text.secondary">
              {formatDate(movie.releaseDate)}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <AccessTimeIcon fontSize="small" color="action" />
            <Typography variant="body2" color="text.secondary">
              {movie.duration} min
            </Typography>
          </Box>
        </Box>

        {/* Description - Fixed height for consistency */}
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 2,
            height: 60, // Fixed 3-line height
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            lineHeight: 1.4,
          }}
        >
          {movie.description}
        </Typography>

        {/* Genres - Fixed height row */}
        <Box sx={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: 0.5,
          height: 24,
          alignItems: 'center' 
        }}>
          {movie.genre.slice(0, 3).map((g, index) => ( // Limit to 3 genres
            <Chip 
              key={index} 
              label={g} 
              size="small" 
              color="primary" 
              variant="outlined"
              sx={{ fontSize: '0.75rem', height: 20 }}
            />
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default MovieCard;
