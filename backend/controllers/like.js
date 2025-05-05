const User = require('../models/User')
const Post = require('../models/post')
const Comment = require('../models/comment')
const Like =require('../models/like')


const likeInPost = async (req, res) => {

try {
        const user = req.user.user._id
        const {postId} = req.params ;
        const post = await Post.findById(postId) ; 
        if(!post) {
            res.status(401).json({message:"post not found"})
        }
    
        const like = await Like.findOne({likeOnPost:postId , likeedByOnPost:user})
        
        if (!like) {
            const newLike = await Like.create({
                likeOnPost: postId,
                likeedByOnPost: user
            });
            await newLike.save()


            post.likes = post.likes || [];
            if (!post.likes.includes(user)) {
                post.likes.push(user);
                await post.save();
            }    
            console.log(post.likes);
            return res.status(201).json({
                 message: "Post liked",
                 like: newLike ,
                 isLikedByCurrentUser: true,

                });
        } else {
            await Like.findByIdAndDelete(like._id);


            post.likes = post.likes || [];
            if (post.likes.includes(user)) {
                post.likes.pull(user);
                await post.save();
            }
            console.log(post.likes);

            return res.status(201).json({ message: "Post disliked",isLikedByCurrentUser: false,
            
            });
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
        const user = user ;
        if(!comment){
            res.status(401).json({message :"comment not found"});

        }

        const like = await Comment.findOne({likeOnComment:commentId , likeedByOnComment:user})

        if(!like){
            const newLike = await Like.create ({
                likeOnComment : commentId ,
                likeedByOnComment : user
            })
            await newLike.save();
            res.status(200).json({message:"done", like :newLike})
        }


        
    } catch (error) {
        console.log(error)
        
    }

}


module.exports = {
    likeInPost , likeInComment
}

