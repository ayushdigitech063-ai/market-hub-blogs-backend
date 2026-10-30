const express = require("express");
const router = express.Router();

const WhatsAppSetting = require("../models/WhatsAppSetting");
const protect = require("../middleware/authMiddleware");

// Default WhatsApp settings
const DEFAULT_SETTING = {
  key: "global",
  phoneNumber: "917733012890",
  message: "Hello! I need some assistance.",
};

// ============================================
// GET /api/site-settings/whatsapp
// Get the current WhatsApp settings
// Public route
// ============================================

router.get("/", async (req, res) => {
  try {
    let setting = await WhatsAppSetting.findOne({
      key: "global",
    });

    // Create default settings if none exist
    if (!setting) {
      setting = await WhatsAppSetting.create(DEFAULT_SETTING);
    }

    return res.status(200).json({
      success: true,
      settings: {
        phoneNumber: setting.phoneNumber,
        message: setting.message,
      },
    });
  } catch (error) {
    console.error("Get WhatsApp settings error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to retrieve WhatsApp settings.",
    });
  }
});

// ============================================
// PUT /api/site-settings/whatsapp
// Update WhatsApp settings
// Admin authentication required
// ============================================

router.put("/", protect, async (req, res) => {
  try {
    // Read and normalize the phone number
    const phoneNumber = String(req.body.phoneNumber || "")
      .replace(/[\s()+-]/g, "");

    // Read and validate the message
    const message =
      typeof req.body.message === "string"
        ? req.body.message.trim()
        : "";

    // Validate the phone number
    if (!/^\d{10,15}$/.test(phoneNumber)) {
      return res.status(400).json({
        success: false,
        message:
          "Please enter a valid WhatsApp number with its country code.",
      });
    }

    // Validate the message
    if (!message) {
      return res.status(400).json({
        success: false,
        message: "WhatsApp message cannot be empty.",
      });
    }

    // Update existing settings or create new settings
    const setting = await WhatsAppSetting.findOneAndUpdate(
      { key: "global" },
      {
        $set: {
          phoneNumber,
          message,
        },
        $setOnInsert: {
          key: "global",
        },
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
        setDefaultsOnInsert: true,
      }
    );

    return res.status(200).json({
      success: true,
      message: "WhatsApp settings updated successfully.",
      settings: {
        phoneNumber: setting.phoneNumber,
        message: setting.message,
      },
    });
  } catch (error) {
    console.error("Update WhatsApp settings error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update WhatsApp settings.",
    });
  }
});

module.exports = router;