const express = require("express");
const router = express.Router();
const { register, login, me } = require("../Controller/adminAuthController");
const protect = require("../middleware/authMiddleware");

router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, me);

module.exports = router;