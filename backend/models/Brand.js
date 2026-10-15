

const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema(
  {
    // ----- purane fields (jaise the waise) -----
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

    // ----- naye SEO editor ke fields -----
    contentHtml: { type: String, default: "" },
    focusKeyword: { type: String, default: "" },
    secondaryKeywords: { type: [String], default: [] },
    faqEnabled: { type: Boolean, default: false },
    faqs: { type: [new mongoose.Schema({ q: String, a: String }, { _id: false })], default: [] },
    showToc: { type: Boolean, default: true },
    status: { type: String, default: "published" },
    publishDate: { type: Date },
    date: { type: String, default: "" },
    readTime: { type: String, default: "" },
    allowComments: { type: Boolean, default: true },
    imageAlt: { type: String, default: "" },
    tags: { type: [String], default: [] },
    seo: { type: mongoose.Schema.Types.Mixed, default: {} },
    seoManual: { type: mongoose.Schema.Types.Mixed, default: {} },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Brand", brandSchema);