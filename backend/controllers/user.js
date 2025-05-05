const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Token = require('../models/token')
const crypto = require('crypto');
const sendEmail = require('../utils/sendEmail');
const PendingUser = require("../models/pendingUser");


const register = async (req, res) => {
    const { email, name, password } = req.body;
    console.log(email , name , password)
    try {
        if (!email || !name || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if the user already exists
        const pendingState = await PendingUser.findOne({ email }) ;
        if (pendingState) {
            return res.status(400).json({ message: "Email already send please check your mailbox" });
        }

        const existingUser = await User.findOne({email:email}) ;{
            if (existingUser) {
                return res.status(400).json({ message: "User already exists" });
            }
    
        }


        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create a pending user
        const pendingUser = new PendingUser({ name, email, password: hashedPassword });
        await pendingUser.save();

        // Generate a verification token associated with the pending user
        const token = new Token({
            userId: pendingUser._id,
            token: crypto.randomBytes(32).toString("hex")
        });
        await token.save();
        console.log(token ,"token") ;

        // Send verification email
        const verificationUrl = `${process.env.BASE_URL}verify/${token.token}`;
        await sendEmail(email, "Verify Email", `Click to verify your email: ${verificationUrl}`);

        res.status(200).json({ message: "Verification email sent. Please check your inbox." });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.json({ mssg: "all fileds are required" })
        }

        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(401).json({message:"user not found"})
        }
        const comparepassword = await bcrypt.compare(password, user.password)
        if (comparepassword) {
            const token = jwt.sign({ user : user }, 'secret_key', { expiresIn: '1h' })
            return res.json({ mssg: "user logged in succesfully", user: user, token: token })
        }
        if (!user.verified){
            let token = await Token.findOne({ userId: user._id});
            if (!token) {
                token = await new Token({
                    userId: user._id,
                    token:crypto.randomBytes(32).toString("hex"),
                }).save();
                const url = `${process.env.BASE_URL}users/${user._id}/verify/${token.token}`;
                await sendEmail(user.email,"Verify Email",url);
                }
                return res.status(400).send({message:"An email sent t your account please verify"});
        }

    } catch (error) {
        return res.json(error);
    }
}

const getUserById = async(req , res) => {
    const {userId} = req.params ;
    try {
        const user = await User.findById(userId) ;
        if(!user){
            return res.status(300).json({message : "user not found"})
        }
        return res.status(200).json(user) ;
    } catch (error) {
        return res.json(error)
    }

}
// const updateUserProfile = asyncHandler (async (req, res) => {
//   const user =await User.findById(req.user._id);

//   if (user) {
//     user.name= req.body.name || user.name;
//     user.email= req.body.email || user.email;
//     user.pic= req.body.pic || user.pic;
  
  
//   if(req.body.password){
//     user.password= req.body.password;
//   }
  
//   const updatedUser = await user.save();
//   res.json({
//     _id:updatedUser._id,
//     name:updatedUser.name,
//     email:updatedUser.email,
//     pic:updatedUser._id,
//     token: generateToken(updatedUser._id),
//   });
//   }else{
//     res.status(404);
//     throw new Error("User not found!");
//   }
// });
module.exports = {
    register,
    login,
    getUserById
    // updateUserProfile
}
