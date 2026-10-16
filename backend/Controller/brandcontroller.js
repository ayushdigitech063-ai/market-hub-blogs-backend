const Brand = require("../models/Brand");


exports.getFeatured = async (req, res) => {
  try {
    const items = await Brand.find({ featured: true }).sort({ order: 1 });
    res.json(items);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const filter = req.query.brand ? { brand: req.query.brand } : {};
    const items = await Brand.find(filter).sort({ order: 1 });
    res.json(items);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};


exports.getBySlug = async (req, res) => {
  try {
    const item = await Brand.findOne({ slug: req.params.slug });
    if (!item) return res.status(404).json({ message: "Not found" });

    const related = await Brand.find({
      brand: item.brand,
      slug: { $ne: item.slug },
    }).sort({ order: 1 });

    res.json({ item, related });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};


exports.create = async (req, res) => {
  try {
    res.status(201).json(await Brand.create(req.body));
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

exports.update = async (req, res) => {
  try {
    const item = await Brand.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      { new: true }
    );
    res.json(item);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

exports.remove = async (req, res) => {
  try {
    await Brand.findOneAndDelete({ slug: req.params.slug });
    res.json({ message: "Deleted" });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};