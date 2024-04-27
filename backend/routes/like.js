const Router = require('express')
const router = Router();
const { likeInComment , likeInPost} = require('../controllers/like')
const {verifyJWT} = require('../middleware/verify')


router.post('/likeInComment/:commentId', verifyJWT , likeInComment)
router.post('/likeInPost/:postId',verifyJWT, likeInPost)

module.exports = router ;