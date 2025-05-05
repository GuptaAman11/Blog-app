const Router = require('express')
const router = Router();
const { register, login, getUserById } = require('../controllers/user');
const Token = require("../models/token");
const User = require("../models/User");
const { verifyJWT } = require('../middleware/verify');
const PendingUser = require("../models/pendingUser");

router.post('/register', register)
router.post('/userinfo/:userId',verifyJWT , getUserById)

router.post('/login', login)
// router.route('/Profile').post(protect,updateUserProfile)
router.get("/verify/:token", async (req, res) => {
    try {
        // Find the verification token
        const token = await Token.findOne({ token: req.params.token });
        if (!token) return res.status(400).json({ message: "Invalid or expired verification link" });

        // Find the pending user associated with the token
        const pendingUser = await PendingUser.findById(token.userId);
        if (!pendingUser) return res.status(400).json({ message: "Invalid verification link" });

        // Transfer pending user data to the main User model
        const newUser = new User({
            name: pendingUser.name,
            email: pendingUser.email,
            password: pendingUser.password,
            verified: true,
        });
        await newUser.save();

        // Delete the token and pending user entries
        await Token.findByIdAndDelete(token._id);
        await PendingUser.findByIdAndDelete(pendingUser._id);

        res.status(200).json({ message: "Email verified successfully. Account created." });
    } catch (error) {
        console.error("Error in email verification:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router ;