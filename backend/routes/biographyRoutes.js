
const express = require("express");
const router = express.Router();
const Biography = require("../models/Biography");

const CACHE_TTL_MS = 30_000;
const MAX_PER_SECTION = 3;
const MAX_CANDIDATES_PER_SECTION = 60;

let homepageCache = null;
let homepageCacheTime = 0;
let homepageCachePromise = null;

const stem = (word) =>
  word.length > 3 && word.endsWith("s")
    ? word.slice(0, -1)
    : word;

const words = (value) =>
  String(value || "")
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter(Boolean)
    .map(stem);

const tokenSection = {
  business: "business",
  busines: "business",
  ceo: "business",
  sport: "sports",
  sports: "sports",
  sportsperson: "sports",
  entrepreneur: "entrepreneur",
  actor: "actors",
  actress: "actors",
};

const legacyGroups = [
  ["entrepreneur", ["entrepreneur", "startup", "founder"]],
  ["sports", ["sport", "cricket", "football", "tennis", "athlete"]],
  ["actors", ["actor", "actress", "cinema", "film", "bollywood"]],
  [
    "business",
    ["business", "ceo", "leader", "tech", "technology", "executive"],
  ],
];

const roleGroups = [
  [
    "sports",
    [
      "player",
      "athlete",
      "cricketer",
      "footballer",
      "sprinter",
      "sportsperson",
      "sport",
    ],
  ],
  ["actors", ["actor", "actress"]],
  ["entrepreneur", ["entrepreneur", "founder"]],
  [
    "business",
    ["ceo", "chairman", "chair", "president", "director", "executive"],
  ],
];

const findGroup = (groups, valueWords) => {
  const match = groups.find(([, groupWords]) =>
    valueWords.some((word) => groupWords.includes(word))
  );

  return match ? match[0] : null;
};

const getBiographySection = (item) => {
  const categoryWords = words(item.category);

  if (
    categoryWords.length === 1 &&
    tokenSection[categoryWords[0]]
  ) {
    return tokenSection[categoryWords[0]];
  }

  const typeSection = words(item.type)
    .map((word) => tokenSection[word])
    .find(Boolean);

  if (typeSection) return typeSection;

  return (
    findGroup(legacyGroups, categoryWords) ||
    findGroup(roleGroups, words(item.role))
  );
};

const emptySections = () => ({
  business: [],
  sports: [],
  entrepreneur: [],
  actors: [],
});

const isComplete = (sections) =>
  Object.values(sections).every(
    (items) => items.length >= MAX_PER_SECTION
  );

const buildHomepage = async () => {
  const sections = emptySections();
  const seen = new Set();

  // Fetch lightweight metadata only; do not fetch large image/description
  // fields while identifying the correct records for each section.
  const candidates = await Biography.find(
    {},
    {
      name: 1,
      role: 1,
      company: 1,
      category: 1,
      type: 1,
      slug: 1,
      shortBio: 1,
      linkedin: 1,
      twitter: 1,
      instagram: 1,
      website: 1,
    }
  )
    .sort({ _id: -1 })
    .limit(MAX_CANDIDATES_PER_SECTION * 4)
    .lean();

  for (const item of candidates) {
    const section = getBiographySection(item);

    if (
      !section ||
      !sections[section] ||
      sections[section].length >= MAX_PER_SECTION
    ) {
      continue;
    }

    const id = String(item._id);
    if (seen.has(id)) continue;
    seen.add(id);

    sections[section].push({
      _id: item._id,
      name: item.name,
      role: item.role,
      company: item.company,
      category: item.category,
      type: item.type,
      slug: item.slug,
      shortBio: String(item.shortBio || "").slice(0, 500),
      description: String(item.shortBio || "").slice(0, 500),
      linkedin: item.linkedin,
      twitter: item.twitter,
      instagram: item.instagram,
      website: item.website,
    });
  }

  // Fetch images only for the 12 selected homepage cards.
  const selectedIds = Object.values(sections)
    .flat()
    .map((item) => item._id);

  if (selectedIds.length) {
    const imageRecords = await Biography.find(
      { _id: { $in: selectedIds } },
      { image: 1 }
    ).lean();

    const imageById = new Map(
      imageRecords.map((item) => [
        String(item._id),
        item.image,
      ])
    );

    for (const item of Object.values(sections).flat()) {
      item.image = imageById.get(String(item._id)) || "";
    }
  }

  return Object.values(sections).flat();
};

// Lightweight homepage API.
router.get("/homepage", async (req, res) => {
  try {
    res.set("Cache-Control", "public, max-age=30");

    if (
      homepageCache &&
      Date.now() - homepageCacheTime < CACHE_TTL_MS
    ) {
      return res.status(200).json(homepageCache);
    }

    // Avoid duplicate database work when requests arrive together.
    if (!homepageCachePromise) {
      homepageCachePromise = buildHomepage();
    }

    const data = await homepageCachePromise;

    homepageCache = data;
    homepageCacheTime = Date.now();

    return res.status(200).json(data);
  } catch (err) {
    console.error("Homepage biographies error:", err);

    return res.status(500).json({
      success: false,
      message: "Failed to load homepage biographies.",
    });
  } finally {
    homepageCachePromise = null;
  }
});

// Existing API: return all biographies.
router.get("/", async (req, res) => {
  try {
    const bios = await Biography.find().lean();
    return res.status(200).json(bios);
  } catch (err) {
    console.error("Fetch biographies error:", err);
    return res.status(500).json({ error: err.message });
  }
});

// Existing API: add biography.
router.post("/add", async (req, res) => {
  try {
    const newBio = new Biography(req.body);
    const savedBio = await newBio.save();

    homepageCache = null;
    homepageCacheTime = 0;

    return res.status(201).json(savedBio);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// Existing API: update biography.
router.put("/update/:id", async (req, res) => {
  try {
    const updatedPost = await Biography.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updatedPost) {
      return res.status(404).json({
        message: "Post not found.",
      });
    }

    homepageCache = null;
    homepageCacheTime = 0;

    return res.status(200).json({
      message: "Post updated successfully.",
      updatedPost,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// Existing API: delete biography.
router.delete("/delete/:id", async (req, res) => {
  try {
    const deletedPost = await Biography.findByIdAndDelete(
      req.params.id
    );

    if (!deletedPost) {
      return res.status(404).json({
        message: "Post not found.",
      });
    }

    homepageCache = null;
    homepageCacheTime = 0;

    return res.status(200).json({
      message: "Post deleted successfully.",
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router;
