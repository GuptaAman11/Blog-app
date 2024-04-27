const {addDetails} = require('../controllers/details')
const Router = require('express')
const router = Router();

router.post('/details',addDetails)

module.exports = router