const Router = require('express')
const router = Router();
const { createPost ,updatePost,getPostById , deletePost , getPost , getPostByPostId ,getPostByCategory} = require('../controllers/post')
const {verifyJWT} = require('../middleware/verify')
const { uploadImage ,getImage} = require('../controllers/uploadimage');
const { upload } = require('../middleware/ImageUpload');

router.post('/createPost',verifyJWT,upload.single('picture'),createPost)
router.put('/updatePost/:id',verifyJWT, updatePost)
router.delete('/deletePost/:id',verifyJWT,deletePost)
router.get('/getPost',verifyJWT,getPost)
router.get('/getPostById/:UserId',verifyJWT,getPostById)
router.get('/getPostByPostId/:postId' ,verifyJWT,getPostByPostId)
router.get('/getPostByCategory',verifyJWT ,getPostByCategory)


// router.post('/file/upload',upload.single('picture') ,uploadImage)
// router.get('/file/:filename', getImage);


module.exports = router;