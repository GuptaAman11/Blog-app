const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,

    },
    email: {
        type: String,
        required: true,
        unique: true,
        index : '1'
    },
    password: {
        type: String,
        required: true,
    },
    verified: { type: Boolean, default: false },

})

const User = mongoose.model("User", userSchema);
 

module.exports = User;

