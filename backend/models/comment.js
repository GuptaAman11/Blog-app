const mongoose = require('mongoose');
const user = require('../models/User')
const post = require('../models/post')

const CommentSchema = mongoose.Schema({

    comment: {
        type: String,
        required: true
    },

    author : {
        type : mongoose.Types.ObjectId,
        ref : "User" 
    },

    postId : {
        type :mongoose.Types.ObjectId,
        ref : "Post"
    },


  
   
    
});



module.exports = mongoose.model("Comment",CommentSchema);
