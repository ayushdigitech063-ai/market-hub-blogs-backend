const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema(
  { id: { type: Number, required: true, unique: true } },
  { strict: false, timestamps: true }
);

module.exports = mongoose.model('Article', articleSchema);