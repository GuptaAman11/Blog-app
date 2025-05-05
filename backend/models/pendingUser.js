// models/PendingUser.js
const mongoose = require("mongoose");

const PendingUserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    isVerified: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = mongoose.model("PendingUser", PendingUserSchema);
