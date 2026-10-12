const mongoose = require('mongoose');

const blogArticleSchema = new mongoose.Schema(
  {
    id: { type: mongoose.Schema.Types.Mixed },
    slug: { type: String, required: true, unique: true },
    authorId: { type: String, required: true },
  },
  { strict: false, timestamps: true }
);

module.exports = mongoose.model('BlogArticle', blogArticleSchema);