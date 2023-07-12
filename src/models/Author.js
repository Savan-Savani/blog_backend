const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
  full_name: String,
  email: String,
});

module.exports = mongoose.model('Author', authorSchema);