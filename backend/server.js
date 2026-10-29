
require("dotenv").config();

const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const express = require("express");
const cors = require("cors");
const compression = require("compression");
const path = require("path");

const connectDB = require("./config/dbConfig");

// Import routes
const uploadRoutes = require("./routes/uploadRoutes");
const otpModule = require("./routes/otpMail");
const biographyRoutes = require("./routes/biographyRoutes");
const articleRoutes = require("./routes/articleRoutes");
const companyRoutes = require("./routes/companyRoutes");
const brandRoutes = require("./routes/brandRoutes");
const slidingCompanyRoutes = require("./routes/slidingcompanyRoutes");
const latestArticleRoutes = require("./routes/latestarticleRoutes");
const whatsappSettingsRoutes = require("./routes/whatsappSettings");

const app = express();

const PORT = process.env.PORT || 5000;
const isProduction = process.env.NODE_ENV === "production";

// Request logging (development only)
app.use((req, res, next) => {
  if (!isProduction) {
    console.log(`${req.method} ${req.url}`);
  }

  next();
});

// Middleware
app.use(cors());
app.use(compression());
app.use(express.json({ limit: "50mb" }));

// Serve uploaded files
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"), {
    maxAge: isProduction ? "1d" : 0,
    etag: true,
  })
);

// Health check
app.get("/api/health", (req, res) => {
  res.status(200).send("ok");
});

// Home route
app.get("/", (req, res) => {
  res.json({
    message: "Market Hub Blogs Backend is running successfully!",
  });
});

// Blog authors
app.use(
  "/api/blog-authors",
  require("./routes/blogAuthorRoutes")
);

// Blog articles
app.use(
  "/api/blog-articles",
  require("./routes/blogArticleRoutes")
);

// Biographies
app.use("/api/biographies", biographyRoutes);

// Submissions
app.use(
  "/api/submissions",
  require("./routes/submissions")
);

// Articles
app.use("/api/articles", articleRoutes);

// Companies
app.use("/api/companies", companyRoutes);

// Brands
app.use("/api/brands", brandRoutes);

// Sliding companies
app.use("/api/sliding-companies", slidingCompanyRoutes);

// Latest articles
app.use("/api/latest-articles", latestArticleRoutes);

// Uploads
app.use("/api/upload", uploadRoutes);

// WhatsApp settings
app.use("/api/site-settings/whatsapp", whatsappSettingsRoutes);

// OTP
app.use("/api/otp", otpModule.router);

// Authentication
app.use(
  "/api/auth",
  require("./routes/authRoutes")
);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API route not found",
  });
});

// Error handler
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

  res.status(statusCode).json({
    success: false,
    message:
      statusCode >= 500 && isProduction
        ? "Internal server error"
        : err.message || "Something went wrong",
  });
});

// Start server after connecting to MongoDB
const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
};

startServer();