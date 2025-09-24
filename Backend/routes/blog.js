const express = require('express');
const auth = require('../middleware/auth');
const Blog = require('../models/Blog');
const router = express.Router();

// Create blog
router.post('/', auth, async (req, res) => {
  try {
    const blog = new Blog({ ...req.body, author: req.user });
    await blog.save();
    res.json(blog);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Get all blogs with pagination
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 6;
    const totalBlogs = await Blog.countDocuments();

    const blogs = await Blog.find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate('author', 'email username');

    res.json({ blogs, totalBlogs });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Get blog by ID
router.get('/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate('author', 'email username');
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    res.json(blog);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Update blog
router.put('/:id', auth, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    if (blog.author.toString() !== req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    blog.title = req.body.title;
    blog.content = req.body.content;
    await blog.save();
    res.json(blog);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Delete blog
router.delete('/:id', auth, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    if (blog.author.toString() !== req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    await blog.deleteOne();
    res.json({ message: 'Blog deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
