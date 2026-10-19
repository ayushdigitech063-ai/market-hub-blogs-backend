const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    postType: { type: String, required: true },
    title: { type: String, required: true, trim: true },
    category: { type: String, trim: true, default: "" },
    form: { type: mongoose.Schema.Types.Mixed, required: true },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    reviewedAt: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Submission", submissionSchema);