const User=require('../models/user.model')
const bcrypt =require('bcrypt')
const jwt=require('jsonwebtoken')


const register=async(req,res)=>{
    console.log(req.body)
    const { email,name,password } = req.body;
    console.log(req.body);
    try {
        if(!email || !name || !password){
            res.json({mssg:"all fields are required"})
        }
        const hashedpassword=bcrypt.hash(password,10);
        const newUser= new User({
            email,
            name,
            password
        })
        await newUser.save();

        res.json({mssg:"user created succesfully"})
        
    } catch (error) {
        console.log(error)
        res.json({error:error})
    }
}

const login=async(req,res)=>{
    const {email,password}=req.body;
    try {
        if(!email || !password){
            res.json({mssg:"all fileds are required"})
        }

        const user=await User.findOne({email:email})
        if(!user){
            res.json({mssg:"user not found"})
        }
        const comparepassword=await bcrypt.compare(password,user.password)
        if(comparepassword){
            const token=jwt.sign({id:email._id},'secret_key',{expiresIn:'1h'})
            res.json({mssg:"user logged in succesfully",user:user,token:token})
        }
        
    } catch (error) {
        res.json({error:error});
        console.log(error)
    }
}

module.exports={
    register,
    login
}