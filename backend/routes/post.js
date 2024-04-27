const Router = require('express')
const router = Router();
const { createPost ,updatePost,getPostById , deletePost , getPost , getPostByPostId ,getPostByCategory} = require('../controllers/post')
const {verifyJWT} = require('../middleware/verify')
const { upload } = require('../middleware/ImageUpload');
const mongoose = require('mongoose');



router.post('/createPost',verifyJWT,upload.single('picture'),createPost)
router.put('/updatePost/:id',verifyJWT, updatePost)
router.delete('/deletePost/:id',verifyJWT,deletePost)
router.get('/getPost',verifyJWT,getPost)
router.get('/getPostById/:UserId',verifyJWT,getPostById)
router.get('/getPostByPostId/:postId' ,verifyJWT,getPostByPostId)
router.get('/getPostByCategory',verifyJWT ,getPostByCategory)
const {Connection} = require('../db')

Connection();
router.get('/api/cluster-assignments', async (req, res) => {
    try {
        const collection = mongoose.connection.collection('trending_posts'); 
        const clusterAssignments = await collection.find({}).toArray(); 
        res.json(clusterAssignments);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' , err });
    }
});


// router.post('/file/upload',upload.single('picture') ,uploadImage)
// router.get('/file/:filename', getImage);


module.exports = router;