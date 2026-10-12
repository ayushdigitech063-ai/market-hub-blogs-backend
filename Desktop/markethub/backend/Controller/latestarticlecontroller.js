const LatestArticle = require("../models/LatestArticle");

exports.getAll = async (req, res) => {
  try {
    const filter = req.query.all === "true" ? {} : { active: true };
    let q = LatestArticle.find(filter).sort({ order: 1 });
    if (req.query.limit) q = q.limit(Number(req.query.limit));
    res.json(await q);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

exports.getBySlug = async (req, res) => {
  try {
    const item = await LatestArticle.findOne({ slug: req.params.slug.toLowerCase() });
    if (!item) return res.status(404).json({ error: "Not found" });
    res.json(item);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

exports.create = async (req, res) => {
  try {
    res.status(201).json(await LatestArticle.create(req.body));
  } catch (e) {
    res.status(400).json({ error: e.code === 11000 ? "Ye slug pehle se hai!" : e.message });
  }
};

exports.update = async (req, res) => {
  try {
    const item = await LatestArticle.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      { returnDocument: "after" }
    );
    if (!item) return res.status(404).json({ error: "Not found" });
    res.json(item);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const item = await LatestArticle.findOneAndDelete({ slug: req.params.slug });
    if (!item) return res.status(404).json({ error: "Not found" });
    res.json({ message: "Deleted" });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};