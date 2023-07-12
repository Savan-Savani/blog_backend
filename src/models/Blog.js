const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author',
  },
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',
  }],
  co_authors: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author',
  }],
  likes: {
    type: Number,
    default: 0,
  },
  likedBy: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    unique: true,
  }],
  views: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model('Blog', blogSchema);