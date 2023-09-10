const Router = require('express')
const router = Router();
const { createPost ,updatePost , deletePost , getPost} = require('../controllers/post')
const {verifyJWT} = require('../middleware/verify')

router.post('/createPost',verifyJWT,createPost)
router.put('/updatePost/:id',verifyJWT, updatePost)
router.delete('/deletePost/:id',verifyJWT,deletePost)
router.get('/getPost',verifyJWT,getPost)


module.exports = router;