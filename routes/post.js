const Router = require('express')
const router = Router();
const { createPost ,updatePost , deletePost , getPost} = require('../controllers/post')


router.post('/createPost',createPost)
router.put('/updatePost', updatePost)
router.delete('/deletePost',deletePost)
router.get('/getPost',getPost)


module.exports = router;