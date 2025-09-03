const userModel = require("../models/userModel")
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
// const blacklistedTokenModel = require("../models/blacklistedToken")
const generateRandomString = require("../utils/generateRandomString")
// const sendEmail = require("../utils/sendEmail")

// SIGNUP
const signUpHandler = async (req, res , next) => {
    const { password } = req.body
    try {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const verificationToken = generateRandomString()
        const verificationExp = Date.now() + 3600000 // 1 hr

        const user = await userModel.create({
            ...req.body,
            password: hashedPassword,
            verificationExp,
            verificationToken
        })

     

        const result = {
            name: user.name,
            email: user.email,
            companyName: user.companyName
        }

        if (!user) {
            return res.status(400).json({
                status: "error",
                message: "Unable to create user"
            })
        }

        return res.status(201).json({
            status: "success",
            message: "User created successfully",
            user: result
        })
    } catch (error) {
        console.log(error);
        next(error)
    }
}

// LOGIN
const login = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await userModel.findOne({ email }).select("+password")
        if (!user) {
            return res.status(404).json({
                status: "error",
                message: "Email or password is incorrect"
            })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(404).json({
                status: "error",
                message: "Email or password is incorrect"
            })
        }

        const token = jwt.sign(
            { userId: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_SECRET_EXP }
        )

        return res.status(200).json({
            status: "success",
            message: "Login successful",
            token
        })

    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    signUpHandler,
    login,
}