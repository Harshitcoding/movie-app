import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  Chip,
  CircularProgress,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useMovies } from '../../context/MovieContext';
import movieService from '../../services/movieService';
import EditIcon from '@mui/icons-material/Edit';

const EditMovie = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    rating: '',
    releaseDate: '',
    duration: '',
    director: '',
    genre: '',
    posterUrl: '',
    imdbId: '',
  });
  const [genreList, setGenreList] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const { updateMovie } = useMovies();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const movie = await movieService.getMovieById(id);
        setFormData({
          title: movie.title,
          description: movie.description,
          rating: movie.rating,
          releaseDate: movie.releaseDate.split('T')[0],
          duration: movie.duration,
          director: movie.director,
          genre: '',
          posterUrl: movie.posterUrl || '',
          imdbId: movie.imdbId || '',
        });
        setGenreList(movie.genre);
        setLoading(false);
      } catch (err) {
        setError('Failed to load movie details');
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddGenre = (e) => {
    if (e.key === 'Enter' && formData.genre.trim()) {
      e.preventDefault();
      if (!genreList.includes(formData.genre.trim())) {
        setGenreList([...genreList, formData.genre.trim()]);
        setFormData({ ...formData, genre: '' });
      }
    }
  };

  const handleDeleteGenre = (genreToDelete) => {
    setGenreList(genreList.filter((genre) => genre !== genreToDelete));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (genreList.length === 0) {
      setError('Please add at least one genre');
      return;
    }

    setSubmitting(true);

    const movieData = {
      ...formData,
      genre: genreList,
      rating: parseFloat(formData.rating),
      duration: parseInt(formData.duration),
    };

    // Remove empty genre field
    delete movieData.genre;
    movieData.genre = genreList;

    try {
      const result = await updateMovie(id, movieData);
      if (result) {
        setSuccess('Movie updated successfully!');
        setTimeout(() => {
          navigate('/admin/manage');
        }, 2000);
      } else {
        setError('Failed to update movie');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update movie');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ mt: 4, textAlign: 'center' }}>
        <CircularProgress size={60} />
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <EditIcon sx={{ mr: 1, fontSize: 32 }} color="primary" />
          <Typography variant="h4" component="h1">
            Edit Movie
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {success}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            margin="normal"
            multiline
            rows={4}
            required
          />

          <TextField
            fullWidth
            label="Rating (0-10)"
            name="rating"
            type="number"
            inputProps={{ min: 0, max: 10, step: 0.1 }}
            value={formData.rating}
            onChange={handleChange}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            label="Release Date"
            name="releaseDate"
            type="date"
            value={formData.releaseDate}
            onChange={handleChange}
            margin="normal"
            InputLabelProps={{ shrink: true }}
            required
          />

          <TextField
            fullWidth
            label="Duration (minutes)"
            name="duration"
            type="number"
            inputProps={{ min: 1 }}
            value={formData.duration}
            onChange={handleChange}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            label="Director"
            name="director"
            value={formData.director}
            onChange={handleChange}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            label="Genre (Press Enter to add)"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            onKeyPress={handleAddGenre}
            margin="normal"
            helperText="Type a genre and press Enter to add"
          />

          <Box sx={{ mt: 2, mb: 2 }}>
            {genreList.map((genre, index) => (
              <Chip
                key={index}
                label={genre}
                onDelete={() => handleDeleteGenre(genre)}
                sx={{ mr: 1, mb: 1 }}
                color="primary"
              />
            ))}
          </Box>

          <TextField
            fullWidth
            label="Poster URL"
            name="posterUrl"
            value={formData.posterUrl}
            onChange={handleChange}
            margin="normal"
          />

          <TextField
            fullWidth
            label="IMDb ID (Optional)"
            name="imdbId"
            value={formData.imdbId}
            onChange={handleChange}
            margin="normal"
          />

          <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              disabled={submitting}
            >
              {submitting ? 'Updating Movie...' : 'Update Movie'}
            </Button>
            <Button
              variant="outlined"
              size="large"
              fullWidth
              onClick={() => navigate('/admin/manage')}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default EditMovie;