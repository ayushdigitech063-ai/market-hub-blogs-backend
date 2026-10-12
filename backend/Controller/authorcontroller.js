const Author = require('../models/Author');
const Article = require('../models/Article');

const getAuthorById = async (req, res) => {
  try {

    let author;
    if (req.params.authorId.match(/^[0-9a-fA-F]{24}$/)) {
      author = await Author.findById(req.params.authorId);
    } else {
      author = await Author.findOne({ id: Number(req.params.authorId) });
    }

    if (!author) {
      return res.status(404).json({ message: "Author not found" });
    }
    res.status(200).json(author);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getAuthorArticles = async (req, res) => {
  try {
    const paramId = req.params.authorId;
    

    let articles = await Article.find({ 
      $or: [
        { author: paramId }, 
        { authorId: isNaN(paramId) ? paramId : Number(paramId) }
      ] 
    });

    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAuthorById,
  getAuthorArticles,
};