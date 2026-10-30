
const express = require("express");
const router = express.Router();

const { login, me } = require("../Controller/adminAuthController");
const protect = require("../middleware/authMiddleware");

// Admin Login
router.post("/login", login);

// Get Logged-in Admin Details
router.get("/me", protect, me);

module.exports = router;
