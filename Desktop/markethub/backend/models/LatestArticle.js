const mongoose = require("mongoose");

const latestArticleSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    title: { type: String, required: true },
    category: { type: String, default: "General" },
    author: { type: String, default: "Admin" },
    authorId: { type: String, default: "" },
    date: { type: String, default: "" },
    readTime: { type: String, default: "" },
    image: { type: String, default: "" },
    excerpt: { type: String, default: "" },
    content: { type: String, default: "" },
    order: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("LatestArticle", latestArticleSchema);