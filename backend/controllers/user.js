const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const register = async (req, res) => {
    const { email, name, password } = req.body;
    try {
        if (!email || !name || !password) {
            res.json({ mssg: "all fields are required" })
        }

        const existingUser = await User.findOne({ email: email })
        if (existingUser) {
            res.json({ mssg: "user already exists" })
        }

       const hashedpassword = await bcrypt.hash(password, 10);
        const newUser = new User(
            {
                name: name,
                email: email,
                password: hashedpassword
            }

        )
        await newUser.save();

        res.json({ mssg: "user created succesfully" })

    } catch (error) {
        console.log(error)
        res.json({ error: error })
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            res.json({ mssg: "all fileds are required" })
        }

        const user = await User.findOne({ email: email })
        if (!user) {
            return res.status(401).json({msg:"user not found"})
        }
        const comparepassword = await bcrypt.compare(password, user.password)
        if (comparepassword) {
            const token = jwt.sign({ user : user }, 'secret_key', { expiresIn: '1h' })
            res.json({ mssg: "user logged in succesfully", user: user, token: token })
        }

    } catch (error) {
        res.json(error);
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
