const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");


module.exports = async function protect(req, res, next) {
  try {
    const header = req.headers.authorization || "";
    const token = header.startsWith("Bearer ") ? header.slice(7) : null;
    if (!token) return res.status(401).json({ error: "Login zaroori hai." });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findById(decoded.id).select("-password");
    if (!admin) return res.status(401).json({ error: "Admin nahi mila." });

    req.admin = admin;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Session expire ho gaya, dobara login karo." });
  }
};