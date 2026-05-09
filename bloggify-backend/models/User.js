const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please add a username'],
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
    },
    profilePicture: {
        type: String,
        default: "", // Will hold a URL from Cloudinary later
    }
}, {
    timestamps: true // Automatically creates 'createdAt' and 'updatedAt' fields
});

module.exports = mongoose.model('User', userSchema);