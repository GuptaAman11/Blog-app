const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/post");

//for NEW POST
const createPost = async (req, res) => {
    const {title,desc}=req.body;

    try {
        const user = req.user._id
        const savedPost= await Post.create({
            title : title , 
            desc : desc,
            author :  user
        });
        res.status(200).json(savedPost);
    } catch (err) {
        res.status(500).json(err);
    }
};

// for UPDATE POST
const updatePost= async (req, res) => {
    try {
        const {title , desc} = req.body;
        const {id} = req.params;
        const user = req.user._id;
        const post = await Post.findById(id);
        console.log(post.author)
        console.log(user)
        if (post.author.toString() === user.toString()) {

            const updatedPost = await Post.findByIdAndUpdate(id,{
                title :title,
                desc : desc
            })
            await updatedPost.save();
            res.status(200).json({msg:"updated post",updatedPost});
          
        } else {
            res.status(401).json("You can update only your post!");
        }
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

        if(user){
            const post = await Post.findById(user);
            res.status(200).json(post);
        }
        

    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports ={
    createPost , deletePost , updatePost , getPost
}

