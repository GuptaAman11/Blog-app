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

    author: {
        
        type: mongoose.Types.ObjectId,
        ref: "User"
  
    },
    picture :{
        type : String , 
        
    },
    categories: {
        type: String,
        required : true
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