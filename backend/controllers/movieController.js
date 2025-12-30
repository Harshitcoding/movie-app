const Movie = require('../models/Movie');
const { addToQueue } = require('../utils/queue');

// @desc    Get all movies with pagination
// @route   GET /api/movies
// @access  Public
const getMovies = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const movies = await Movie.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Movie.countDocuments();

    res.json({
      movies,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalMovies: total,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get sorted movies
// @route   GET /api/movies/sorted
// @access  Public
const getSortedMovies = async (req, res) => {
  try {
    const { sortBy = 'title', order = 'asc' } = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const sortOrder = order === 'desc' ? -1 : 1;
    const sortOptions = {};
    sortOptions[sortBy] = sortOrder;

    const movies = await Movie.find()
      .sort(sortOptions)
      .skip(skip)
      .limit(limit);

    const total = await Movie.countDocuments();

    res.json({
      movies,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalMovies: total,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Search movies
// @route   GET /api/movies/search
// @access  Public
const searchMovies = async (req, res) => {
  try {
    const { query } = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    if (!query) {
      return res.status(400).json({ message: 'Search query is required' });
    }

    const searchRegex = new RegExp(query, 'i');

    const movies = await Movie.find({
      $or: [
        { title: searchRegex },
        { description: searchRegex },
        { director: searchRegex },
      ],
    })
      .skip(skip)
      .limit(limit);

    const total = await Movie.countDocuments({
      $or: [
        { title: searchRegex },
        { description: searchRegex },
        { director: searchRegex },
      ],
    });

    res.json({
      movies,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalMovies: total,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single movie
// @route   GET /api/movies/:id
// @access  Public
const getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    res.json(movie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add new movie (with queue)
// @route   POST /api/movies
// @access  Private/Admin
const addMovie = async (req, res) => {
  try {
    const movieData = req.body;

    // Add to queue for lazy insertion
    addToQueue(async () => {
      const movie = await Movie.create(movieData);
      return movie;
    });

    res.status(201).json({ 
      message: 'Movie added to queue for processing',
      data: movieData 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update movie
// @route   PUT /api/movies/:id
// @access  Private/Admin
const updateMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    const updatedMovie = await Movie.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json(updatedMovie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete movie
// @route   DELETE /api/movies/:id
// @access  Private/Admin
const deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    await Movie.findByIdAndDelete(req.params.id);

    res.json({ message: 'Movie removed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getMovies,
  getSortedMovies,
  searchMovies,
  getMovieById,
  addMovie,
  updateMovie,
  deleteMovie,
};