const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a movie title'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Please provide a description'],
  },
  rating: {
    type: Number,
    required: [true, 'Please provide a rating'],
    min: 0,
    max: 10,
  },
  releaseDate: {
    type: Date,
    required: [true, 'Please provide a release date'],
  },
  duration: {
    type: Number,
    required: [true, 'Please provide duration in minutes'],
  },
  director: {
    type: String,
    required: [true, 'Please provide director name'],
  },
  genre: {
    type: [String],
    required: [true, 'Please provide at least one genre'],
  },
  posterUrl: {
    type: String,
    default: '',
  },
  imdbId: {
    type: String,
    unique: true,
    sparse: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update the updatedAt field before saving
movieSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Movie', movieSchema);