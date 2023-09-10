const mongoose = require("mongoose");

const Post = require("../models/User");


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
        ref:"comment"
    }]
},
    {timestamps: true}
    );
module.exports = mongoose.model("Post",PostSchema);
abs
