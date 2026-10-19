const mongoose = require("mongoose");

const whatsappSettingSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      default: "global",
      unique: true,
      required: true,
    },
    phoneNumber: {
      type: String,
      default: "917733012890",
      required: true,
      trim: true,
    },
    message: {
      type: String,
      default: "Hello! I need some assistance.",
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "WhatsAppSetting",
  whatsappSettingSchema
);