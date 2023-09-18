const mongoose = require('mongoose');
const user = require('../models/User')
const post = require('../models/post')

const CommentSchema = mongoose.Schema({

    author : {
        type : mongoose.Types.ObjectId,
        ref : "User" 
    },

    postId : {
        type :mongoose.Types.ObjectId,
        ref : "Post"
    },

    likes : [{
        type : mongoose.Types.ObjectId,
        ref : "Comment"

    }],
  
   
    comment: {
        type: String,
        required: true
    }
});



module.exports = mongoose.model("Comment",CommentSchema);
