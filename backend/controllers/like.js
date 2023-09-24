const User = require('../models/User')
const Post = require('../models/post')
const Comment = require('../models/comment')
const Like =require('../models/like')


const likeInPost = async (req, res) => {

try {
        const {postId} = req.params ;
        const post = await Post.findById(postId) ; 
        if(!post) {
            res.status(401).json({msg:"post not found"})
        }
    
        const user = req.user._id
        const like = await Like.findOne({likeOnPost:postId , likeedByOnPost:req.user._id })
        console.log(like)


        if (!like) {
            const newLike = await Like.create({
                likeOnPost: postId,
                likeedByOnPost: req.user._id
            });
            await newLike.save();


            post.likes = post.likes || [];
            if (!post.likes.includes(req.user._id)) {
                post.likes.push(req.user._id);
                await post.save();
            }

            return res.status(201).json({ msg: "Post liked", like: newLike });
        } else {
            await Like.findByIdAndDelete(like._id);


            post.likes = post.likes || [];
            if (post.likes.includes(req.user._id)) {
                post.likes.pull(req.user._id);
                await post.save();
            }

            return res.status(201).json({ msg: "Post disliked" });
        }



    
    
    
        
} catch (error) {
    console.log(error)
    
}

}


const likeInComment = async (req, res) => {

    try {

        const {commentId} = req.params ;
        const comment = await Comment.findById(commentId);
        console.log(comment)
        const user = req.user._id ;
        if(!comment){
            res.status(401).json({msg :"comment not found"});

        }

        const like = await Comment.findOne({likeOnComment:commentId , likeedByOnComment:req.user._id})

        if(!like){
            const newLike = await Like.create ({
                likeOnComment : commentId ,
                likeedByOnComment : req.user._id
            })
            await newLike.save();
            res.status(200).json({msg:"done", like :newLike})
        }


        
    } catch (error) {
        console.log(error)
        
    }

}


module.exports = {
    likeInPost , likeInComment
}

