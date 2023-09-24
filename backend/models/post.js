const mongoose = require("mongoose");

const User = require("../models/User");
const Comment = require("../models/comment");


const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        
    },
    desc: {
        type: String,
        required: true,
    },
    photo: {
        type: String,

    },
    author: {
        
        type: mongoose.Types.ObjectId,
        ref: "User"
    
      
        
    },
    catgories: {
        type: Array,
    },

    comments: [{
        type : mongoose.Schema.Types.ObjectId,
        ref:"Comment"
    }], 
    likes: [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    }]
},
    {timestamps: true}
    );
module.exports = mongoose.model("Post",PostSchema);