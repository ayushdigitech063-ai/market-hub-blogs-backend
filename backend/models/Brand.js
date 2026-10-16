

const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema(
  {

    id: Number,                   
    slug: { type: String, required: true, unique: true },
    name: String,               
    articleTitle: String,     
    brand: String,           
    category: String,
    subCategory: String,
    description: String,
    shortDescription: String,
    blog: String,                    
    articleContent: String,
    features: [String],
    imageUrl: String,
    featured: { type: Boolean, default: false }, 
    order: { type: Number, default: 0 },


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