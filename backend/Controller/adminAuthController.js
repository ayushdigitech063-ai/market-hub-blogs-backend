

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");


const makeToken = (admin) =>
  jwt.sign(
    { 
      id: admin._id, 
      name: admin.name, 
      email: admin.email 
    }, 
    process.env.JWT_SECRET, 
    { expiresIn: "7d" }
  );

const safeAdmin = (a) => ({ id: a._id, name: a.name, email: a.email });


exports.register = async (req, res) => {
  try {
    const { name, email, password, secretKey } = req.body;

    if (!name || !email || !password || !secretKey) {
      return res.status(400).json({ error: "All fields are required." });
    }

    if (secretKey !== process.env.ADMIN_REGISTER_KEY) {
      return res.status(403).json({ error: "The secret key is incorrect." });
    }
    if (password.length < 6) {
      return res.status(400).json({ error: "Password must be at least 6 characters long." });
    }

    const exists = await Admin.findOne({ email: email.toLowerCase().trim() });
    if (exists) return res.status(409).json({ error: "Is email se admin pehle se bana hua hai." });

    const hashed = await bcrypt.hash(password, 10);
    const admin = await Admin.create({ name, email, password: hashed });

    res.status(201).json({ token: makeToken(admin), admin: safeAdmin(admin) });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ error: "Server error. Please try again." });
  }
};


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Please enter both email and password." });
    }

    const admin = await Admin.findOne({ email: email.toLowerCase().trim() });
    if (!admin) return res.status(401).json({ error: "Invalid email or password." });

    const ok = await bcrypt.compare(password, admin.password);
    if (!ok) return res.status(401).json({ error: "Invalid email or password." });

    res.json({ token: makeToken(admin), admin: safeAdmin(admin) });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Server error. Please try again." });
  }
};


exports.me = async (req, res) => {
  res.json({ admin: safeAdmin(req.admin) });
};