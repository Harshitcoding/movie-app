import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  CircularProgress,
  Chip,
  useTheme,
  useMediaQuery,
  Stack,
  Grid,
  Card,
  CardContent,
  Avatar,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useMovies } from '../../context/MovieContext';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import Pagination from '../../components/Pagination';

const ManageMovies = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const navigate = useNavigate();
  const { movies, loading, error, pagination, fetchMovies, deleteMovie } = useMovies();

  const [currentPage, setCurrentPage] = useState(1);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [movieToDelete, setMovieToDelete] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    fetchMovies(currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDeleteClick = (movie) => {
    setMovieToDelete(movie);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      const ok = await deleteMovie(movieToDelete._id);
      if (ok) {
        setSuccessMessage("Movie deleted successfully!");
        fetchMovies(currentPage);
      }
    } catch (err) {
      console.error("Delete failed:", err);
    }
    setDeleteDialogOpen(false);
    setMovieToDelete(null);
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setMovieToDelete(null);
  };

  const handleEdit = (movieId) => {
    navigate(`/admin/edit-movie/${movieId}`);
  };

  const handleAddNew = () => {
    navigate('/admin/add-movie');
  };

  if (loading && movies.length === 0) {
    return (
      <Container maxWidth="xl" sx={{ py: 8 }}>
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
          <CircularProgress size={48} />
        </Box>
      </Container>
    );
  }

  const movieList = Array.isArray(movies) ? movies : [];

  // Desktop Table Component
  const DesktopTable = () => (
    <Paper elevation={4} sx={{ borderRadius: 3, overflow: 'hidden' }}>
      <TableContainer sx={{ bgcolor: 'grey.50' }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow sx={{ bgcolor: 'primary.main' }}>
              <TableCell sx={{ color: 'white', fontWeight: 700, fontSize: '1rem' }}>Title</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 700, fontSize: '1rem' }}>Rating</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 700, fontSize: '1rem' }}>Release Date</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 700, fontSize: '1rem' }}>Duration</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 700, fontSize: '1rem' }}>Genres</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 700, fontSize: '1rem' }} align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {movieList.length > 0 ? (
              movieList.map((movie) => (
                <TableRow 
                  key={movie._id} 
                  hover 
                  sx={{ 
                    '&:hover': { bgcolor: 'grey.50' },
                    transition: 'all 0.2s ease'
                  }}
                >
                  <TableCell sx={{ fontWeight: 500 }}>{movie.title || "Untitled"}</TableCell>
                  <TableCell>
                    <Chip 
                      label={`⭐ ${movie.rating || "N/A"}`} 
                      color="warning" 
                      size="small"
                      sx={{ fontWeight: 600 }}
                    />
                  </TableCell>
                  <TableCell sx={{ fontWeight: 500 }}>
                    {movie.releaseDate ? new Date(movie.releaseDate).getFullYear() : "N/A"}
                  </TableCell>
                  <TableCell sx={{ fontWeight: 500 }}>
                    {movie.duration ? `${movie.duration} min` : "N/A"}
                  </TableCell>
                  <TableCell>
                    {(movie.genre || []).slice(0, 3).map((g, idx) => (
                      <Chip 
                        key={idx} 
                        label={g} 
                        size="small" 
                        variant="outlined" 
                        sx={{ mr: 0.5, mb: 0.5 }}
                      />
                    ))}
                  </TableCell>
                  <TableCell align="center">
                    <IconButton 
                      color="primary" 
                      onClick={() => handleEdit(movie._id)}
                      sx={{ mr: 1 }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton 
                      color="error" 
                      onClick={() => handleDeleteClick(movie)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 8 }}>
                  <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
                    No movies found
                  </Typography>
                  <Button 
                    variant="outlined" 
                    startIcon={<AddIcon />}
                    onClick={handleAddNew}
                  >
                    Add your first movie
                  </Button>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );

  // Mobile Card Component
  const MobileCards = () => (
    <Box sx={{ mt: 3 }}>
      {movieList.length > 0 ? (
        movieList.map((movie) => (
          <Card 
            key={movie._id}
            elevation={2}
            sx={{ 
              mb: 2, 
              borderRadius: 3,
              transition: 'all 0.2s ease',
              '&:hover': { 
                boxShadow: 6,
                transform: 'translateY(-2px)'
              }
            }}
          >
            <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                <Typography 
                  variant="h6" 
                  sx={{ fontWeight: 700, flex: 1, mr: 2 }}
                >
                  {movie.title || "Untitled"}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <IconButton 
                    color="primary" 
                    onClick={() => handleEdit(movie._id)}
                    size="small"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton 
                    color="error" 
                    onClick={() => handleDeleteClick(movie)}
                    size="small"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Box>
              
              <Stack spacing={1.5} sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ minWidth: 80 }}>
                    Rating:
                  </Typography>
                  <Chip 
                    label={`⭐ ${movie.rating || "N/A"}`} 
                    color="warning" 
                    size="small"
                    sx={{ fontWeight: 600 }}
                  />
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ minWidth: 80 }}>
                    Year:
                  </Typography>
                  <Typography variant="body1" fontWeight={500}>
                    {movie.releaseDate ? new Date(movie.releaseDate).getFullYear() : "N/A"}
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ minWidth: 80 }}>
                    Duration:
                  </Typography>
                  <Typography variant="body1" fontWeight={500}>
                    {movie.duration ? `${movie.duration} min` : "N/A"}
                  </Typography>
                </Box>
              </Stack>

              {(movie.genre || []).length > 0 && (
                <Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1, fontWeight: 500 }}>
                    Genres:
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {(movie.genre || []).slice(0, 3).map((g, idx) => (
                      <Chip 
                        key={idx} 
                        label={g} 
                        size="small" 
                        variant="outlined" 
                      />
                    ))}
                  </Box>
                </Box>
              )}
            </CardContent>
          </Card>
        ))
      ) : (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
            No movies found
          </Typography>
          <Button 
            variant="contained" 
            startIcon={<AddIcon />}
            onClick={handleAddNew}
            size="large"
          >
            Add your first movie
          </Button>
        </Box>
      )}
    </Box>
  );

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 2, sm: 3, md: 5 } }}>
      {/* Header */}
      <Box sx={{ mb: { xs: 3, md: 4 } }}>
        <Typography 
          variant={isMobile ? "h4" : "h3"} 
          component="h1" 
          sx={{ 
            mb: 2, 
            fontWeight: 700, 
            background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            lineHeight: 1.2
          }}
        >
          Manage Movies
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddNew}
          size={isMobile ? "medium" : "large"}
          sx={{
            px: { xs: 3, md: 4 },
            py: 1.5,
            fontWeight: 600,
            borderRadius: 3,
            boxShadow: 3,
            '&:hover': { boxShadow: 6, transform: 'translateY(-1px)' }
          }}
        >
          Add New Movie
        </Button>
      </Box>

      {successMessage && (
        <Alert severity="success" sx={{ mb: 3, borderRadius: 2 }} icon={false}>
          <Typography variant="body1" fontWeight={500}>
            {successMessage}
          </Typography>
        </Alert>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }} icon={false}>
          <Typography variant="body1" fontWeight={500}>
            {error}
          </Typography>
        </Alert>
      )}

      {/* Responsive Content */}
      {!isMobile ? (
        <DesktopTable />
      ) : (
        <MobileCards />
      )}

      {pagination.totalPages > 1 && (
        <Box sx={{ mt: { xs: 4, md: 5 }, display: "flex", justifyContent: "center" }}>
          <Pagination
            currentPage={currentPage}
            totalPages={pagination.totalPages}
            onPageChange={handlePageChange}
          />
        </Box>
      )}

      <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 700, pb: 1 }}>
          Delete Movie
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ lineHeight: 1.6 }}>
            Are you sure you want to delete <strong>"{movieToDelete?.title}"</strong>? 
            This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 0 }}>
          <Button onClick={handleDeleteCancel} variant="outlined">Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">
            Delete Movie
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ManageMovies;
