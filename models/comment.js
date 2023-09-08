const mongoose = require('mongoose')



const commentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,

    },
    author: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    }

    
})

const comment = mongoose.model("comment", commentSchema);

module.exports = comment;