const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];

    if (!allowedTypes.includes(file.mimetype)) {
      throw new Error("Sirf JPG, PNG, WEBP ya GIF image allowed hai.");
    }

    return {
      folder: "market-hub",
      resource_type: "image",
      allowed_formats: ["jpg", "jpeg", "png", "webp", "gif"],
      public_id: `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`,
    };
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Sirf JPG, PNG, WEBP ya GIF image allowed hai."));
  }
};

module.exports = multer({
  storage,
  fileFilter,
  limits: { fileSize: 20 * 1024 * 1024 },
});