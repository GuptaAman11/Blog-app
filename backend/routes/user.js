const Router = require('express')
const router = Router();
const { register, login } = require('../controllers/user');
const token = require('../models/token');
const sendEmail = require('../utils/sendEmail');
const crypto = require("crypto");



router.post('/register', register)
router.post('/login', login)
// router.route('/Profile').post(protect,updateUserProfile)



module.exports = router;