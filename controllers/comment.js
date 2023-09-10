const Comment = require('../models/comment');
const Post = require('../models/post');
const User = require('../models/User');

 const newComment = async (req, res) => {
    const {comment} = req.body ; 
    const {postId} = req.params;
   
    

    if(!comment){
        res.status(404).json({msg : "comment cant be empty"});

    }

    const post = await Post.findById(postId);

    if(!post){
        res.status(404).json({msg : "post not found"})
    }
    try {
        const user = req.user._id;
        
       
        console.log(user)
        const addComment = await Comment.create({
            comment :comment,
            author : user,
            postId : post
        });
        await addComment.save();
        res.status(200).json(addComment);

        
        
    }
    catch(err){
        console.log(err)
    }
};


 const getComments = async (req, res) => {
  
}

 const deleteComment = async (req, res) => {
  
}

module.exports = {
    newComment , getComments , deleteComment
}