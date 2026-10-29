const SlidingCompany = require("../models/Slidingcompany");

exports.getAll = async (req, res) => {
  try {
    const filter = req.query.all === "true" ? {} : { active: true };
    res.json(await SlidingCompany.find(filter).sort({ order: 1 }));
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

exports.getBySlug = async (req, res) => {
  try {
    const item = await SlidingCompany.findOne({ slug: req.params.slug.toLowerCase() });
    if (!item) return res.status(404).json({ message: "Not found" });
    res.json(item);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

exports.create = async (req, res) => {
  try {
    res.status(201).json(await SlidingCompany.create(req.body));
  } catch (e) {
    res.status(400).json({ error: e.code === 11000 ? "This slug already exists!": e.message });
  }
};

exports.update = async (req, res) => {
  try {
    const item = await SlidingCompany.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      { new: true }
    );
    if (!item) return res.status(404).json({ error: "Not found" });
    res.json(item);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const item = await SlidingCompany.findOneAndDelete({ slug: req.params.slug });
    if (!item) return res.status(404).json({ error: "Not found" });
    res.json({ message: "Deleted" });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};