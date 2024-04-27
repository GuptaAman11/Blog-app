const Router = require('express')
const router = Router();
const { register, login } = require('../controllers/user');



router.post('/register', register)
router.post('/login', login)
// router.route('/Profile').post(protect,updateUserProfile)



module.exports = router;