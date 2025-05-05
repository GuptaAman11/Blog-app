const Comment = require('../models/comment');
const Post = require('../models/post');
const User = require('../models/User');

 const newComment = async (req, res) => {
    const {comment} = req.body ; 
    const {postId} = req.params; 
   
    

    if(!comment){
        res.status(401).json({msg : "comment cant be empty"});

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
        res.status(200).json(addComment);

        post.comments.push(addComment._id);
        await post.save();
        await addComment.save();

        
        
    }
    catch(err){
        console.log(err)
    }
};


 const getComments = async (req, res) => {
    
    try {

        if(true){
            const comment = await Comment.find();
            res.status(200).json(comment);
        }
        

    } catch (err) {
        res.status(500).json(err);
    }
  
}

 const deleteComment = async (req, res) => {
    try{
        const user = req.user._id
       const {commentId} = req.params;

       const comment = await Comment.findById(commentId)

       if(!comment){
        res.status(401).json({msg : "comment not found"});

       }

       if(comment.author.toString() === user.toString() )
                {
                    await Comment.findByIdAndDelete(commentId);
                    return res.status(200).json("Post has been deleted");
            }
            else{
                return res.status(500).json({msg:"error"})
            }
    }
    catch(err){

    }
  
}

const getCommentById = async (req,res) => {
    const {postId} = req.params ; 
    try{
 
        const comment =await Comment.find({postId:postId})
        if(!comment){
            res.status(401).json({msg: "comment not found"})
    
        }
        console.log(comment , "comment")
        res.status(200).json({comment:comment});
    } catch (error) {
        console.log(error)
        res.status(500).json({error})
    }

}





module.exports = {
    newComment , getComments , deleteComment , getCommentById
}