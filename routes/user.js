const Router = require('express')
const router = Router();
const { register, login } = require('../controllers/user')


router.route('/register').post(register);
router.post('/login', login)


module.exports = router;