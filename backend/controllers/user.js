const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Token = require('../models/token')
const crypto = require('crypto');
const sendEmail = require('../utils/sendEmail');



const register = async (req, res) => {
    const { email, name, password } = req.body;
    try {
        if (!email || !name || !password) {
            return res.json({ msg: "all fields are required" })
        }

        const existingUser = await User.findOne({ email: email })
        if (existingUser) {
           return res.json({ msg: "user already exists" })
        }

        const salt = await bcrypt.genSalt(Number(12));
		const hashPassword = await bcrypt.hash(req.body.password, salt); 
           const newUser = new User(
            {
                name: name,
                email: email,
                password: hashPassword
            }

        ) 
        await newUser.save();

        const token = await new Token({
            userId: newUser._id,
            token:crypto.randomBytes(32).toString("hex"),
        }).save();
        const url = `${process.env.BASE_URL}users/${newUser._id}/verify/${token.token}`;
        console.log(url)
        await sendEmail(newUser.email,"Verify Email",url);



        return res.json({ msg: "An Email is sent to your account, please verify" ,token:token , userId: newUser._id })
    } catch (error) {
        console.log(error)
       return res.json({ msg: error })
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.json({ mssg: "all fileds are required" })
        }

        const user = await User.findOne({ email: email, verified: true });
        if (!user) {
            return res.status(401).json({msg:"user not found"})
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
        console.log(error)
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
    // updateUserProfile
}
