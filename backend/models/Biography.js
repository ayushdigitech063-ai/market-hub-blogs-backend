
const mongoose = require('mongoose');

const biographySchema = new mongoose.Schema({
  // ----- purane fields (jaise the waise) -----
  name: { type: String, required: true },
  role: { type: String, required: true },
  company: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  born: { type: String },
  birthplace: { type: String },
  slug: { type: String, required: true, unique: true },

  // ----- dashboard ke purane form ke fields jo schema me nahi the -----
  type: { type: String, default: "" },        // ceo / sports / entrepreneur / actor
  shortBio: { type: String, default: "" },
  linkedin: { type: String, default: "" },
  twitter: { type: String, default: "" },
  instagram: { type: String, default: "" },
  website: { type: String, default: "" },

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
  featured: { type: Boolean, default: false },
  imageAlt: { type: String, default: "" },
  tags: { type: [String], default: [] },
  seo: { type: mongoose.Schema.Types.Mixed, default: {} },
  seoManual: { type: mongoose.Schema.Types.Mixed, default: {} },
}, { timestamps: true });

module.exports = mongoose.model('Biography', biographySchema);