
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const compression = require("compression");
const path = require("path");

require("dotenv").config();

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

// Identify the environment once.
const isProduction = process.env.NODE_ENV === "production";

// Basic request logging in development only.
app.use((req, res, next) => {
  if (!isProduction) {
    console.log(`${req.method} ${req.url}`);
  }

  next();
});

// Enable CORS.
app.use(cors());

// Compress supported HTTP responses.
app.use(compression());

// Parse JSON request bodies.
app.use(express.json({ limit: "10mb" }));

// Serve uploaded files.
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"), {
    maxAge: isProduction ? "1d" : 0,
    etag: true,
  })
);

// Health check.
app.get("/api/health", (req, res) => {
  res.status(200).send("ok");
});

// Root endpoint.
app.get("/", (req, res) => {
  res.json({
    message: "Market Hub Blogs Backend is running successfully!",
  });
});

// Existing API routes — preserved.
app.use(
  "/api/blog-authors",
  require("./routes/blogAuthorRoutes")
);

app.use(
  "/api/blog-articles",
  require("./routes/blogArticleRoutes")
);

app.use("/api/biographies", biographyRoutes);

app.use(
  "/api/submissions",
  require("./routes/submissions")
);

app.use("/api/articles", articleRoutes);

app.use("/api/companies", companyRoutes);

app.use("/api/brands", brandRoutes);

app.use(
  "/api/sliding-companies",
  slidingCompanyRoutes
);

app.use(
  "/api/latest-articles",
  latestArticleRoutes
);

app.use("/api/upload", uploadRoutes);

app.use(
  "/api/site-settings/whatsapp",
  whatsappSettingsRoutes
);

app.use("/api/otp", otpModule.router);

app.use(
  "/api/auth",
  require("./routes/authRoutes")
);

// Handle unknown routes.
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API route not found",
  });
});

// Central error handler.
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

// Connect to MongoDB before accepting requests.
const startServer = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is missing from environment variables");
    }

    await mongoose.connect(process.env.MONGO_URI);

    console.log(
      "MongoDB Connected Successfully to digitalMarketingDB!"
    );

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
};

startServer();
