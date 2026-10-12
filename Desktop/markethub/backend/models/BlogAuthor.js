const mongoose = require('mongoose');

const blogAuthorSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
  },
  { strict: false, timestamps: true }
);

module.exports = mongoose.model('BlogAuthor', blogAuthorSchema);