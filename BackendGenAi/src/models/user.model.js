const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    username: {
        type: String,
        unique: true,
        sparse: true, // Allows multiple null/undefined values for email/password users if username is optional
        trim: true
    },
    email: {
       type: String,
       unique: true,
       required: true,
       lowercase: true,
       trim: true
    },
    password: {
        type: String,
        required: function() {
            // Password sirf tabhi required hoga jab user Google OAuth se login na kar raha ho
            return !this.googleId;
        }
    },
    googleId: {
        type: String,
        unique: true,
        sparse: true // Zaroori hai taaki normal users ke liye null values par duplicate key error na aaye
    }
}, { timestamps: true });

// User ka data 'users' collection mein store hoga
const userModel = mongoose.model("users", userSchema);

module.exports = userModel;