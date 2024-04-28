const Router = require('express')
const router = Router();
const { register, login } = require('../controllers/user');
const Token = require("../models/token");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const bcrypt = require("bcrypt");
const User = require("../models/User");



router.post('/register', register)
router.post('/login', login)
// router.route('/Profile').post(protect,updateUserProfile)

router.get("/:id/verify/:token", async (req, res) => {
	try {
		const user = await User.findOne({ _id: req.params.id });
		if (!user) return res.status(400).send({ message: "Invalid link" });

		const token = await Token.findOne({
			userId: user._id,
			token: req.params.token,
		});
		if (!token) return res.status(400).send({ message: "Invalid link" });
		user.verified = true;
		await user.save();

		res.status(200).send({ message: "Email verified successfully" });
	} catch (error) {
		console.log(error)
		res.status(500).send({ message: "Internal Server Error" });
	}
});



module.exports = router;