const express = require('express');
const Post = require('../models/Post');
const { authMiddleware } = require('../middleware/authMiddleware');
const router = express.Router();

// @route   GET /api/posts
// @desc    Get all blog posts (Public)
router.get('/', async (req, res) => {
    try {
        // .populate() pulls in the author's username from the User collection
        const posts = await Post.find().populate('author', 'username').sort({ createdAt: -1 });
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   GET /api/posts/:id
// @desc    Get a single post by ID (Public)
router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate('author', 'username');
        if (!post) return res.status(404).json({ message: 'Post not found' });
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   POST /api/posts
// @desc    Create a new post (Private)
router.post('/', authMiddleware, async (req, res) => {
    try {
        const { title, content, categories } = req.body;

        const newPost = await Post.create({
            title,
            content,
            categories,
            author: req.user._id, // Secured via the protect middleware
        });

        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   PUT /api/posts/:id
// @desc    Update a post (Private)
router.put('/:id', authMiddleware, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) return res.status(404).json({ message: 'Post not found' });

        // Ensure the logged-in user matches the post author
        if (post.author.toString() !== req.user.id) {
            return res.status(401).json({ message: 'User not authorized to update this post' });
        }

        const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   DELETE /api/posts/:id
// @desc    Delete a post (Private)
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) return res.status(404).json({ message: 'Post not found' });

        // Ensure the logged-in user matches the post author
        if (post.author.toString() !== req.user.id) {
            return res.status(401).json({ message: 'User not authorized to delete this post' });
        }

        await post.deleteOne();
        res.status(200).json({ message: 'Post removed successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;