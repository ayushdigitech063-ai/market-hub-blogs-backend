const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema(
  {
    id: Number,                       // purana id (135, 141...)
    slug: { type: String, required: true, unique: true },
    name: String,                     // product name
    articleTitle: String,             // jio wale articles ke liye
    brand: String,                    // Jio / Vivo / Apple
    category: String,
    subCategory: String,
    description: String,
    shortDescription: String,
    blog: String,                     // pura blog content
    articleContent: String,
    features: [String],
    imageUrl: String,
    featured: { type: Boolean, default: false },  // home page pe dikhana hai ya nahi
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Brand", brandSchema);