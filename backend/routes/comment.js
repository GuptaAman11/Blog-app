const Router = require('express')
const router = Router();
const { newComment , getComments , deleteComment,getCommentById } = require('../controllers/comment')
const {verifyJWT} = require('../middleware/verify')


router.post('/newComments/:postId',verifyJWT, newComment);
router.get('/getComments',verifyJWT, getComments);
router.delete('/deleteComment/:commentId',verifyJWT, deleteComment)
router.get('/getCommentById/:postId',verifyJWT, getCommentById)




module.exports = router;