const mongoose  = require('mongoose')
const User = require('../models/User')
const Post = require('../models/post')
const Comment = require('../models/comment')

const likeSchema = new mongoose.Schema({

    likeOnPost : {
        type :  mongoose.Types.ObjectId,
        ref :"Post"
    } , 
    likeedByOnPost : [{

        type : mongoose.Types.ObjectId,
        ref : "User"

    }] ,
    likeOnComment : {
        type : mongoose.Types.ObjectId,
        ref : "Comment"
    },

    likeedByOnComment :[{
        type : mongoose.Types.ObjectId,
        ref : "User"
    }]

    
    

    
},
{timestamps : true}
)

module.exports = mongoose.model("Like" , likeSchema)