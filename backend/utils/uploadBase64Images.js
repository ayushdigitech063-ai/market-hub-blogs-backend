const cloudinary = require("../config/cloudinary");

// <img src="data:image/...;base64,..."> ko pakadta hai
const DATA_IMG =
  /(<img\b[^>]*?\bsrc=["'])(data:image\/(?:png|jpe?g|webp|gif);base64,[A-Za-z0-9+/=\s]+)(["'])/gi;

// HTML ke andar jo base64 images hain unhe Cloudinary pe upload karke URL se replace karta hai
const uploadBase64Images = async (html) => {
  const text = String(html || "");
  const matches = [...text.matchAll(DATA_IMG)];
  if (!matches.length) return text;

  const unique = [...new Set(matches.map((m) => m[2]))];
  const urlMap = {};

  await Promise.all(
    unique.map(async (dataUri) => {
      const result = await cloudinary.uploader.upload(dataUri.replace(/\s/g, ""), {
        folder: "market-hub",
        resource_type: "image",
        allowed_formats: ["jpg", "jpeg", "png", "webp", "gif"],
      });
      urlMap[dataUri] = result.secure_url;
    })
  );

  return text.replace(DATA_IMG, (full, pre, uri, post) => `${pre}${urlMap[uri]}${post}`);
};

module.exports = uploadBase64Images;