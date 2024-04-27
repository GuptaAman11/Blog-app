const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/post");

//for NEW POST
const createPost = async (req, res) => {
    const {title,desc  , categories}=req.body;
    let picture ;
    if(req.file){
        picture = req.file.path
        console.log(picture)

    }
    
    console.log(picture)
    try {
        const user = req.user._id
        const savedPost= await Post.create({
            title : title , 
            desc : desc,
            author :  user ,
            picture : picture,
            categories : categories
        });
        res.status(200).json(savedPost);
        console.log(picture)
    } catch (err) {
        res.status(500).json(err);
    }
};

// for UPDATE POST
const updatePost= async (req, res) => {
    try {
        const {title , desc , categories} = req.body;
        const {id} = req.params;
        const user = req.user._id;
        const post = await Post.findById(id);
        console.log(post.author)
        console.log(user)
        // if (post.author.toString() === user.toString()) {


            const updatedPost = await Post.findByIdAndUpdate(id,{
                title :title,
                desc : desc ,
                categories : categories

            })
            await updatedPost.save();
            // post.title=title;
            // post.desc=desc;
            // post.categories=categories
            // await post.save()
            res.status(200).json({msg:"updated post",updatedPost,post});
          
        // } else {
        //     res.status(401).json("You can update only your post!");
        // }
    } catch (err) {
        res.status(500).json(err);
    }
};

// for DELETE POST
const deletePost = async (req, res) => {
    try {
        const user = req.user._id
        
        const { id } = req.params;
        const post = await Post.findById(id);
    
        if (!post) {
            return res.status(404).json("Post not found");
        }
        

        
           if(post.author.toString() === user.toString() )
                {await Post.findByIdAndDelete(id);
                return res.status(200).json("Post has been deleted");
            }
            else{
                return res.status(500).json({msg:"error"})
            }
            } 
     catch (err) {
        console.log(err)
        return res.status(500).json(err);
        
    }
  
};


// for GET POST
const getPost= async (req, res) => {

    const user = req.user._id;
    try {

        if(true){
            const post = await Post.find().sort({createdAt:-1}).populate('author')
            res.status(200).json(post);
        }
        

    } catch (err) {
        res.status(500).json(err);
    }
};
// finding post by user id
const getPostById=async(req,res)=>{
    const {UserId}=req.params;
    try {
        const user=await User.findById(UserId);
        if(!user){
            res.status(401).json({"mssg":"user not found"})
        }

        const posts=await Post.find({author:UserId}).populate('author')
        const qty=posts.length;
        if(!posts){
            res.status(401).json({"mssg":"posts not found",qty:posts})
        }

        res.status(200).json({posts:posts,qty:qty});
    } catch (error) {
        
        res.status(500).json(error);
    }

}

const getPostByPostId = async(req,res)=>{
    try {
        const {postId}= req.params
        console.log(postId)
        const post = await Post.findById(postId)
        if(!post){
            res.status(401).json({msg:"post not found"}).populate('author')
        }
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json(error);
        
    }



}

const getPostByCategory =async(req,res)=>{
    try {
        const {category} = req.query;
        const post = await Post.find({categories:category})
        if(!post){
            res.status(404).json({msg:"post not found"})
        }
        res.status(200).json(post)
    }
    catch(error){
        console.log(error)

    }
}
module.exports ={
    createPost , deletePost , updatePost , getPost,getPostById,getPostByPostId , getPostByCategory
}

