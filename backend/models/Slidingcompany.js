const mongoose = require("mongoose");

const slidingCompanySchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    name: { type: String, required: true },
    imageURL: { type: String, default: "" },
    description: { type: String, default: "" },  
    tagline: { type: String, default: "VERIFIED PARTNER" },
    blog: { type: String, default: "" },       
    features: [String],
    website: { type: String, default: "" },
    order: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SlidingCompany", slidingCompanySchema);