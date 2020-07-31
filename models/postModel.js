const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'post must have a name'],
    unique: true,
    trim: true,
    maxlength: [100, 'post must have less than 100 characters'],
    minlength: [5, 'post must have more than 5 characters'],
  },
  ratingsAverage: {
    type: Number,
    default: 3,
    min: [1, 'Rating must be above 1.0'],
    max: [5, 'Rating must be below 5.0'],
  },
  summary: {
    type: String,
    trim: true,
    required: [true, 'post must have summary'],
  },
  description: {
    type: String,
    trim: true,
  },
  imageCover: {
    type: String,
    //required: [true, 'post must have image cover'],
  },
  image: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
});

module.exports = mongoose.model('Post', postSchema);
