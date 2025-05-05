const router = require("express").Router();
const User = require("../models/User");
const Like = require("../models/like");
const Post = require("../models/post");
const cloudinary = require("../utils/cloudinary")


const createPost = async (req, res) => {
    try {
        console.log(req.body)
        const { title, desc , categories} = req.body;
        let imageUrl = null;
        if (req.file) {
            
            const result = await cloudinary.uploader.upload(req.file.path , {folder : 'Blog-webApp'});
            imageUrl = result.secure_url;
            console.log(result);
        }


        const user = req.user.user._id;
        const savedPost = await Post.create({
            title,
            desc,
            author: user,
            categories : categories ,
            picture: imageUrl, 
        });

        return res.status(200).json({savedPost , message : "post created sucessfully"});
    } catch (err) {
        console.error('Error creating post:', err);
        return res.status(500).json(err);
    }
};


const updatePost= async (req, res) => {
    try {
        const {title , desc , categories} = req.body;
        const {id} = req.params;
        const user = req.user.user._id;
        const post = await Post.findById(id);
     
        


            const updatedPost = await Post.findByIdAndUpdate(id,{
                title :title,
                desc : desc ,
                categories : categories

            })
            await updatedPost.save();
            
            
            
            
            return res.status(200).json({msg:"updated post",updatedPost,post});
          
        
        
        
    } catch (err) {
        return res.status(500).json(err);
    }
};


const deletePost = async (req, res) => {
    try {
        const user = req.user.user._id
        
        const { id } = req.params;
        const post = await Post.findById(id);
        console.log("first",post) 
        console.log("second",user)
    
        if (!post) {
            return res.status(404).json("Post not found");
        }
        
        
        if (post.author && post.author.toString() === user.toString()) {
            await Post.findByIdAndDelete(id);
            return res.status(200).json("Post has been deleted");
        } else {
            return res.status(403).json("You are not authorized to delete this post");
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};



const getPost= async (req, res) => {

    const user = req.user.user._id;
    try {

        if(true){
            const post = await Post.find().sort({createdAt:-1}).populate('author')
            return res.status(200).json({post , message : "post fetched sucessfully"});
        }
        

    } catch (err) {
        return res.status(500).json(err);
    }
};

const getPostById=async(req,res)=>{
    const {UserId}=req.params;
    try {
        const user=await User.findById(UserId);
        if(!user){
            res.status(401).json({message:"user not found"})
        }

        const posts=await Post.find({author:UserId}).populate('author')
        const qty=posts.length;
        if(!posts){
            res.status(401).json({message:"posts not found",qty:posts})
        }

        res.status(200).json({posts:posts,qty:qty , message : "post get sucessfully"});
    } catch (error) {
        
        res.status(500).json(error);
    }

}

const getPostByPostId = async(req,res)=>{
    try {
        const {postId}= req.params
        console.log(postId)
        const post = await Post.findById(postId).populate('author')
        if(!post){
            res.status(401).json({msg:"post not found"})
        }
        return res.status(200).json(post)
    } catch (error) {
        return res.status(500).json(error);
        
    }



}

const getPostByCategory =async(req,res)=>{
    try {
        const {category} = req.query;
        const post = await Post.find({categories:category})
        if(!post){
            res.status(404).json({msg:"post not found"})
        }
        res.status(200).json({post , message :`post of ${category} fetched sucessfully`})
    }
    catch(error){
        console.log(error)

    }
}

const a5getPost = async (req, res) => {
    const { page = 1, search = '' } = req.query;
    const limit = 5;
    const skip = (page - 1) * limit;

    try {
        const query = {};        
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                
            ];
        }        
        
        const matchingPosts = await Post.find(query).sort({ createdAt: -1 }).populate('author');
        const paginatedPosts = matchingPosts.slice(skip, skip + limit);
        const hasMore = skip + limit < matchingPosts.length;
        return res.status(200).json({
            posts: paginatedPosts,
            message: "Posts fetched successfully",
            hasMore,
            totalResults: matchingPosts.length,
            currentPage: page
        });
    } catch (err) {
        return res.status(500).json(err);
    }
};


const getSearchPost = async (req, res) => {
    const user = req.user.user._id;
    const { search } = req.query; 
    console.log(search)
    try {
        const query = {}; 

        
        if (search) {
            query.$or = [
                { title: { $regex: search } }, 
                
            ];
        }

        
        const posts = await Post.find(query).sort({ createdAt: -1 }).populate('author');

        return res.status(200).json({ posts, message: "Post fetched successfully" });
    } catch (err) {
        return res.status(500).json(err);
    }
};


module.exports ={
    a5getPost ,
    getSearchPost ,
    createPost , deletePost , updatePost , getPost,getPostById,getPostByPostId , getPostByCategory
}


