const express = require('express')
const { Login, Register } = require('../Controllers/AuthController');
const router = express.Router();
const validator = require('express-validator')
const { check, validationResult } = validator

router.post('/login', [
    check("email").isEmail().withMessage("Email is required"),
    check("password").isLength({ min: 8 }).withMessage('password must be at least 8 chararacters')
], Login)

router.post('/register', [
    check("userName").isLength({ min: 5 }).withMessage('Username must be at least 5 chararacters'),
    check("password").isLength({ min: 8 }).withMessage('password must be at least 8 chararacters'),
    check("email").isEmail().withMessage("Email is required")
], Register)



module.exports = router