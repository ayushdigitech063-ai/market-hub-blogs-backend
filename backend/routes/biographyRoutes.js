const express = require('express');
const router = express.Router();
const Biography = require('../models/Biography');

router.post('/add', async (req, res) => {
  try {
    const newBio = new Biography(req.body);
    const savedBio = await newBio.save();
    res.status(201).json(savedBio);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get('/', async (req, res) => {
  try {
    const bios = await Biography.find();
    res.status(200).json(bios);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.put('/update/:id', async (req, res) => {
  try {
    const updatedPost = await Biography.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found." });
    }

    res.status(200).json({
      message: "Post updated successfully.",
      updatedPost
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.delete('/delete/:id', async (req, res) => {
  try {
    const deletedPost = await Biography.findByIdAndDelete(req.params.id);

    if (!deletedPost) {
      return res.status(404).json({ message: "Post not found." });
    }

    res.status(200).json({ message: "Post deleted successfully." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;