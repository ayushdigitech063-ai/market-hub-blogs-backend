// ============================================
// 1. ENVIRONMENT CONFIGURATION
// ============================================

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const compression = require("compression");
const path = require("path");

// ============================================
// 2. DATABASE CONFIGURATION
// ============================================

const connectDB = require("./config/dbConfig");

// ============================================
// 3. IMPORT ROUTE FILES
// ============================================

const authRoutes = require("./routes/authRoutes");
const articleRoutes = require("./routes/articleRoutes");
const biographyRoutes = require("./routes/biographyRoutes");
const blogArticleRoutes = require("./routes/blogArticleRoutes");
const blogAuthorRoutes = require("./routes/blogAuthorRoutes");
const brandRoutes = require("./routes/brandRoutes");
const companyRoutes = require("./routes/companyRoutes");
const latestArticleRoutes = require("./routes/latestarticleRoutes");
const slidingCompanyRoutes = require("./routes/slidingcompanyRoutes");
const submissionRoutes = require("./routes/submissions");
const uploadRoutes = require("./routes/uploadRoutes");
const whatsappSettingsRoutes = require("./routes/whatsappSettings");

// Keep the existing OTP module and its export format
const otpModule = require("./routes/otpMail");

// ============================================
// 4. CREATE EXPRESS APP
// ============================================

const app = express();

const PORT = process.env.PORT || 5000;

const isProduction =
  process.env.NODE_ENV === "production";

// ============================================
// 5. REQUEST LOGGER
// Development environment only
// ============================================

app.use((req, res, next) => {
  if (!isProduction) {
    console.log(`${req.method} ${req.originalUrl}`);
  }

  next();
});

// ============================================
// 6. GLOBAL MIDDLEWARE
// ============================================

// Enable Cross-Origin Resource Sharing
app.use(cors());

// Compress HTTP responses
app.use(compression());

// Parse JSON request bodies
app.use(express.json({ limit: "1mb" }));

// ============================================
// 7. STATIC FILES
// Serve files from the uploads directory
// ============================================

app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"), {
    maxAge: isProduction ? "1d" : 0,
    etag: true,
  })
);

// ============================================
// 8. HEALTH CHECK ROUTE
// GET /api/health
// ============================================

app.get("/api/health", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "API is running.",
  });
});

// ============================================
// 9. HOME ROUTE
// GET /
// ============================================

app.get("/", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Market Hub Blogs Backend is running.",
  });
});

// ============================================
// 10. AUTHENTICATION ROUTES
// Base path: /api/auth
// ============================================

app.use("/api/auth", authRoutes);

// ============================================
// 11. ARTICLE ROUTES
// Base path: /api/articles
// ============================================

app.use("/api/articles", articleRoutes);

// ============================================
// 12. BIOGRAPHY ROUTES
// Base path: /api/biographies
// ============================================

app.use("/api/biographies", biographyRoutes);

// ============================================
// 13. BLOG ARTICLE ROUTES
// Base path: /api/blog-articles
// ============================================

app.use("/api/blog-articles", blogArticleRoutes);

// ============================================
// 14. BLOG AUTHOR ROUTES
// Base path: /api/blog-authors
// ============================================

app.use("/api/blog-authors", blogAuthorRoutes);

// ============================================
// 15. BRAND ROUTES
// Base path: /api/brands
// ============================================

app.use("/api/brands", brandRoutes);

// ============================================
// 16. COMPANY ROUTES
// Base path: /api/companies
// ============================================

app.use("/api/companies", companyRoutes);

// ============================================
// 17. LATEST ARTICLE ROUTES
// Base path: /api/latest-articles
// ============================================

app.use("/api/latest-articles", latestArticleRoutes);

// ============================================
// 18. SLIDING COMPANY ROUTES
// Base path: /api/sliding-companies
// ============================================

app.use("/api/sliding-companies", slidingCompanyRoutes);

// ============================================
// 19. SUBMISSION ROUTES
// Base path: /api/submissions
// ============================================

app.use("/api/submissions", submissionRoutes);

// ============================================
// 20. IMAGE UPLOAD ROUTES
// Base path: /api/upload
// ============================================

app.use("/api/upload", uploadRoutes);

// ============================================
// 21. WHATSAPP SETTINGS ROUTES
// Base path: /api/site-settings/whatsapp
// ============================================

app.use(
  "/api/site-settings/whatsapp",
  whatsappSettingsRoutes
);

// ============================================
// 22. OTP ROUTES
// Base path: /api/otp
// ============================================

// This expects otpMail.js to export an object
// containing a property named "router".
app.use("/api/otp", otpModule.router);

// ============================================
// 23. API ROUTE NOT FOUND
// Keep this after all routes
// ============================================

app.use((req, res) => {
  return res.status(404).json({
    success: false,
    message: "API route not found.",
  });
});

// ============================================
// 24. GLOBAL ERROR HANDLER
// Keep this after the 404 handler
// ============================================

app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  if (!isProduction) {
    console.error("Server error:", err);
  }

  const statusCode =
    Number.isInteger(err.statusCode) &&
    err.statusCode >= 400 &&
    err.statusCode < 600
      ? err.statusCode
      : 500;

  return res.status(statusCode).json({
    success: false,
    message:
      statusCode >= 500
        ? "Internal server error."
        : err.message || "Something went wrong.",
  });
});

// ============================================
// 25. START SERVER
// Connect to MongoDB before starting Express
// ============================================

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}.`);
      console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
};

startServer();