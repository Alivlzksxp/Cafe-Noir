const Article = require('../models/Article');

const getArticles = async (req, res) => {
  try {
    const articles = await Article.find();
    res.json({ articles });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createArticle = async (req, res) => {
  try {
    const { title, description, isActive } = req.body;
    const article = await Article.create({ title, description, isActive });
    res.status(201).json(article);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateArticle = async (req, res) => {
  try {
    const updates = req.body;
    const article = await Article.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true }
    );
    if (!article) return res.status(404).json({ message: 'Article not found' });
    res.json(article);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteArticle = async (req, res) => {
  try {
    await Article.findByIdAndDelete(req.params.id);
    res.json({ message: 'Article deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getArticles,
  createArticle,
  updateArticle,
  deleteArticle
};
