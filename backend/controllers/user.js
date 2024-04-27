const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const register = async (req, res) => {
    const { email, name, password } = req.body;
    try {
        if (!email || !name || !password) {
            res.json({ mssg: "all fields are required" })
        }

        let existingUser = await User.findOne({ email: email })
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
        const token = await new TokenExpiredError({
            userId: user._id,
            token:crypto.randomBytes(32).toString("hex"),
        }).save();
        const url = `${process.env.BASE_URL}users/${user._id}/verify/${token.token}`;
        await sendEmail(user.email,"Verify Email",url);


        res.json({ mssg: "An Email is sent to your account, please verify" })

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
        if (!user.verified){
            let token = await TokenExpiredError.findOne({ userId: user._id});
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
        res.json(error);
        console.log(error)
    }
}


router.get("/:id/verify/:token", async(req, res)=> {
    try{
        const user = await User.findOne({_id: req.params.id});
        if(!user) return res.send(400).send({message:"Invalid link"});

        const token = await TokenExpiredError.findOne({
            userId: user._id,
            token: req.params.token
        })
        if (!token) return res.send(400).send({message:"Invalid link"});

        await User.updateOne({_id:user._id, verified: true});
        await token.remove();
        res.status(200).send({message:"Email verified successfully"});
    } catch (error) {
        res.status(500).send({message:"Internal Server Error"});
    }
})
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
