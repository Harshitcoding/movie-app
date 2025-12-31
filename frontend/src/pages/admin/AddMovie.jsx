import React, { useState } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  Chip,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useMovies } from '../../context/MovieContext';
import AddIcon from '@mui/icons-material/Add';

const AddMovie = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    rating: '',
    releaseDate: '',
    duration: '',
    director: '',
    posterUrl: '',
    imdbId: '',
  });

  const [genreInput, setGenreInput] = useState('');
  const [genreList, setGenreList] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const { addMovie } = useMovies();
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle genre input change
  const handleGenreInputChange = (e) => {
    setGenreInput(e.target.value);
  };

  // Add genre on Enter press
  const handleAddGenre = (e) => {
    if (e.key === 'Enter' && genreInput.trim()) {
      e.preventDefault();

      if (!genreList.includes(genreInput.trim())) {
        setGenreList([...genreList, genreInput.trim()]);
      }
      setGenreInput('');
    }
  };

  // Delete genre
  const handleDeleteGenre = (genreToDelete) => {
    setGenreList(genreList.filter((genre) => genre !== genreToDelete));
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (genreList.length === 0) {
      setError('Please add at least one genre by typing and pressing Enter');
      return;
    }

    setLoading(true);

    // Final movie object
const movieData = {
  title: formData.title,
  description: formData.description,
  rating: parseFloat(formData.rating),
  releaseDate: formData.releaseDate,
  duration: parseInt(formData.duration),
  director: formData.director,
  genre: genreList,
  posterUrl: formData.posterUrl,
  ...(formData.imdbId && { imdbId: formData.imdbId })  // 🔥 IMPORTANT FIX
};


    try {
      const result = await addMovie(movieData);

      if (result) {
        setSuccess('Movie added successfully!');

        setTimeout(() => {
          navigate('/admin/manage');
        }, 2000);
      } else {
        setError('Failed to add movie');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add movie');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <AddIcon sx={{ mr: 1, fontSize: 32 }} color="primary" />
          <Typography variant="h4" component="h1">
            Add New Movie
          </Typography>
        </Box>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

        <Box component="form" onSubmit={handleSubmit}>
          <TextField fullWidth label="Title" name="title" value={formData.title}
            onChange={handleChange} margin="normal" required />

          <TextField fullWidth label="Description" name="description"
            value={formData.description} onChange={handleChange}
            margin="normal" multiline rows={4} required />

          <TextField fullWidth label="Rating (0-10)" name="rating" type="number"
            inputProps={{ min: 0, max: 10, step: 0.1 }} value={formData.rating}
            onChange={handleChange} margin="normal" required />

          <TextField fullWidth label="Release Date" name="releaseDate" type="date"
            value={formData.releaseDate} onChange={handleChange}
            margin="normal" InputLabelProps={{ shrink: true }} required />

          <TextField fullWidth label="Duration (minutes)" name="duration"
            type="number" inputProps={{ min: 1 }} value={formData.duration}
            onChange={handleChange} margin="normal" required />

          <TextField fullWidth label="Director" name="director"
            value={formData.director} onChange={handleChange}
            margin="normal" required />

          <TextField fullWidth label="Genre (Press Enter to add)" name="genreInput"
            value={genreInput} onChange={handleGenreInputChange}
            onKeyPress={handleAddGenre} margin="normal"
            helperText="Type a genre and press Enter" />

          <Box sx={{ mt: 2, mb: 2, minHeight: '40px' }}>
            {genreList.length > 0 ? (
              genreList.map((genre, index) => (
                <Chip key={index} label={genre} onDelete={() => handleDeleteGenre(genre)}
                  sx={{ mr: 1, mb: 1 }} color="primary" />
              ))
            ) : (
              <Typography variant="body2" color="text.secondary">
                No genres added yet.
              </Typography>
            )}
          </Box>

          <TextField fullWidth label="Poster URL" name="posterUrl"
            value={formData.posterUrl} onChange={handleChange} margin="normal" />

          <TextField fullWidth label="IMDb ID (Optional)" name="imdbId"
            value={formData.imdbId} onChange={handleChange} margin="normal" />

          <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
            <Button type="submit" variant="contained" size="large" fullWidth disabled={loading}>
              {loading ? 'Adding Movie...' : 'Add Movie'}
            </Button>

            <Button variant="outlined" size="large" fullWidth
              onClick={() => navigate('/admin/manage')}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default AddMovie;
