const Router = require('express')
const router = Router();
const { newComment , getComments , deleteComment } = require('../controllers/comment')
const {verifyJWT} = require('../middleware/verify')


router.post('/newComments/:postId',verifyJWT, newComment);
router.get('/getComments/:id',verifyJWT, getComments);
router.delete('/deleteComment/:id',verifyJWT, deleteComment)



module.exports = router;