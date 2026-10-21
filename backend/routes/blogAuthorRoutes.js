const express = require('express');
const router = express.Router();
const BlogAuthor = require('../models/BlogAuthor');


router.get('/', async (req, res) => {
  try {
    const authors = await BlogAuthor.find().sort({ _id: 1 });
    res.json(authors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const author = await BlogAuthor.findOne({ id: req.params.id });
    if (!author) return res.status(404).json({ error: 'Author not found' });
    res.json(author);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.post('/', async (req, res) => {
  try {
    const saved = Array.isArray(req.body)
      ? await BlogAuthor.insertMany(req.body)
      : await new BlogAuthor(req.body).save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.put('/:id', async (req, res) => {
  try {
    const updated = await BlogAuthor.findOneAndUpdate(
      { id: req.params.id },
      { $set: req.body },
      { new: true, strict: false }
    );
    if (!updated) return res.status(404).json({ error: 'Author not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const deleted = await BlogAuthor.findOneAndDelete({ id: req.params.id });
    if (!deleted) return res.status(404).json({ error: 'Author not found' });
    res.json({ message: 'Author deleted', id: deleted.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;