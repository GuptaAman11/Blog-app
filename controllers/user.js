const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const register = async (req, res) => {
    const { email, name, password } = req.body;
    console.log(email)
    try {
        if (!email || !name || !password) {
            res.json({ mssg: "all fields are required" })
        }

        const existingUser = await User.findOne({ email: email })
        if (existingUser) {
            res.json({ mssg: "user already exists" })
        }

        const hashedpassword = bcrypt.hash(password, 10);
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
            res.json({ mssg: "user not found" })
        }
        const comparepassword = await bcrypt.compare(password, user.password)
        if (comparepassword) {
            const token = jwt.sign({ id: email._id }, 'secret_key', { expiresIn: '1h' })
            res.json({ mssg: "user logged in succesfully", user: user, token: token })
        }

    } catch (error) {
        res.json(error);
        console.log(error)
    }
}

module.exports = {
    register,
    login
}