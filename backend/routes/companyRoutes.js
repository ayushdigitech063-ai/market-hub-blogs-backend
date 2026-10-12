const express = require('express');
const router = express.Router();
const Company = require('../models/Company');

// GET: Saari companies
router.get('/', async (req, res) => {
  try {
    const companies = await Company.find();
    res.json(companies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST: Add new company
router.post('/', async (req, res) => {
  try {
    const newCompany = new Company(req.body);
    const savedCompany = await newCompany.save();
    res.status(201).json(savedCompany);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT: company update karo (sirf wahi fields bhejo jo badalni hain)
router.put('/:slug', async (req, res) => {
  try {
    const updated = await Company.findOneAndUpdate(
      { slug: req.params.slug },
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ error: 'Company not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE: company delete karo
router.delete('/:slug', async (req, res) => {
  try {
    const deleted = await Company.findOneAndDelete({ slug: req.params.slug });
    if (!deleted) return res.status(404).json({ error: 'Company not found' });
    res.json({ message: 'Company deleted', slug: deleted.slug });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;