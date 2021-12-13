const AuthModel = require("../Models/AuthModel")
const validator = require('express-validator')
const { validationResult } = validator
const generateToken = require('../Utils/generateToken')
const Login = async(req, res) => {

    const email = req.body.email;
    const password = req.body.password;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        console.log(errors)
        return res.status(422).json({
            error: errors.array()[0].msg
        });
    } else {
        const user = await AuthModel.findOne({ email })

        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                userName: user.userName,
                email: user.email,
                userType: user.userType,
                token: generateToken(user._id),
            })
        } else {
            res.status(401).send({
                Unsuccess: 'Invalid email or password'
            })
            console.log('Invalid email or password')
        }
    }


}



const Register = async(req, res) => {

    const userName = req.body.userName;
    const email = req.body.email;
    const password = req.body.password;
    const rpassword = req.body.rpassword;
    const userType = req.body.userType;

    const errors = validationResult(req);

    if (password !== rpassword) {
        res.json({
            Unsuccess: "RePassword is not matched With Password"
        })
        return;
    }

    if (!errors.isEmpty()) {
        console.log(errors)
        return res.status(422).json({
            error: errors.array()[0].msg
        });
    } else {
        const userExists = await AuthModel.findOne({ userName })
        if (userExists) {
            res.status(400).json({ "msg": "User name exists" })
            console.log('User name exists')
            return
        }

        const user = await AuthModel.create({
            userName,
            email,
            password,
            userType
        })

        if (user) {
            res.status(201).json({
                _id: user._id,
                userName: user.userName,
                email: user.email,
                userType: user.userType,
                token: generateToken(user._id),
            })
        } else {
            res.status(400).json({ "msg": "Invalid user data" })
            throw new Error('Invalid user data')
        }
    }

}

module.exports = { Register, Login }