const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  imageURL: { type: String, required: true },
  description: { type: String, required: true },
  startId: { type: Number, required: true },
  endId: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Company', companySchema);