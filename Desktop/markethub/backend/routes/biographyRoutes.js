const express = require('express');
const router = express.Router();
const Biography = require('../models/Biography');

// 1. ADD POST
router.post('/add', async (req, res) => {
  try {
    const newBio = new Biography(req.body);
    const savedBio = await newBio.save();
    res.status(201).json(savedBio);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. GET ALL POSTS
router.get('/', async (req, res) => {
  try {
    const bios = await Biography.find();
    res.status(200).json(bios);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. UPDATE POST (PUT)
router.put('/update/:id', async (req, res) => {
  try {
    const updatedPost = await Biography.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ message: "Yeh post nahi mili!" });
    }

    res.status(200).json({
      message: "Post successfully update ho gayi!",
      updatedPost
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. DELETE POST (DELETE)
router.delete('/delete/:id', async (req, res) => {
  try {
    const deletedPost = await Biography.findByIdAndDelete(req.params.id);

    if (!deletedPost) {
      return res.status(404).json({ message: "Yeh post nahi mili!" });
    }

    res.status(200).json({ message: "Post successfully delete ho gayi!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;