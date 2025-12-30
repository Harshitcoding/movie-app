const express = require('express');
const router = express.Router();
const {
  getMovies,
  getSortedMovies,
  searchMovies,
  getMovieById,
  addMovie,
  updateMovie,
  deleteMovie,
} = require('../controllers/movieController');
const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/adminMiddleware');

// Public routes
router.get('/', getMovies);
router.get('/sorted', getSortedMovies);
router.get('/search', searchMovies);
router.get('/:id', getMovieById);

// Protected admin routes
router.post('/', protect, admin, addMovie);
router.put('/:id', protect, admin, updateMovie);
router.delete('/:id', protect, admin, deleteMovie);

module.exports = router;