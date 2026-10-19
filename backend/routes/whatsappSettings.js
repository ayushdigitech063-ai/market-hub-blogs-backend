
const express = require("express");
const router = express.Router();

const WhatsAppSetting = require("../models/WhatsAppSetting");
const authMiddleware = require("../middleware/authMiddleware");
const DEFAULT_SETTING = {
  key: "global",
  phoneNumber: "917733012890",
  message: "Hello! I need some assistance.",
};

// Public website: latest WhatsApp number fetch kare
router.get("/", async (req, res) => {
  try {
    let setting = await WhatsAppSetting.findOne({ key: "global" });

    if (!setting) {
      setting = await WhatsAppSetting.create(DEFAULT_SETTING);
    }

    return res.json({
      phoneNumber: setting.phoneNumber,
      message: setting.message,
    });
  } catch (error) {
    console.error("WhatsApp settings fetch error:", error);
    return res.status(500).json({
      message: "Failed to load WhatsApp settings.",
    });
  }
});

// Admin only: WhatsApp number update kare
router.put("/", authMiddleware, async (req, res) => {
  try {
    const phoneNumber = String(req.body.phoneNumber || "")
      .replace(/[\s()+-]/g, "");

    const message =
      typeof req.body.message === "string"
        ? req.body.message.trim()
        : DEFAULT_SETTING.message;

    if (!/^\d{10,15}$/.test(phoneNumber)) {
      return res.status(400).json({
        message:
          "Enter a valid WhatsApp number with country code, using 10–15 digits.",
      });
    }

    if (!message) {
      return res.status(400).json({
        message: "WhatsApp message cannot be empty.",
      });
    }

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

    return res.json({
      message: "WhatsApp settings updated successfully.",
      settings: {
        phoneNumber: setting.phoneNumber,
        message: setting.message,
      },
    });
  } catch (error) {
    console.error("WhatsApp settings update error:", error);
    return res.status(500).json({
      message: "Failed to update WhatsApp settings.",
    });
  }
});

module.exports = router;
