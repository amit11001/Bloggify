// models/Post.js
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a title'],
        trim: true,
    },
    content: {
        type: String,
        required: [true, 'Please add content'],
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User', // This creates a relationship between the Post and the User
    },
    coverImage: {
        type: String,
        default: "", 
    },
    categories: {
        type: Array,
        required: false,
    }
}, {
    timestamps: true 
});

module.exports = mongoose.model('Post', postSchema);