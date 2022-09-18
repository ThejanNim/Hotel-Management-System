const User = require('../models/User');
const validator = require('validator');
const bcrypt = require('bcrypt');
const { createJWT } = require("../utils/auth");

exports.signup = async (req, res) => {
    try {
        const {name, email, role, mobileNumber, password, confirm_password, gender, address} = req.body
        const isEmail = validator.isEmail(email);

        if (!name || !email || !role || !mobileNumber || !password || !confirm_password ) {
            return res.status(400).json({Error: "Please Provide registration details."});
        }
        if (!isEmail) {
            return res.status(400).json({Error: "Please provide valid email address"});
        }
        if (password != confirm_password) {
            return res.status(400).json({error: "Password is mismatch"});
        }
        
        const isUserExists = await User.findOne({ email });
  
        if (isUserExists) {
            return res.status(400).json({ error: "User already Exists"})
        }

        const user = new User({
            name: name,
            email: email,
            role: role,
            password: password,
            mobileNumber: mobileNumber,
            gender: gender,
            address: address
        });

        bcrypt.hash(password, 10, function(err, hash) {
            user.password = hash;
            user.save().then(response => {
                res.status(200).json({
                    success: true,
                    result: response
                })
            })
            .catch(err => {
                res.status(500).json({
                    errors: [{ error: err }]
                });
            });
        });
    } catch (error) {
         return res.status(400).json({ error: 'Your request could not be processed. Please try again.'});   
    }
}

exports.signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const isEmail = validator.isEmail(email); 

        if (!email || !password) {
            return res.status(400).json({ error: "Please provide a Login Details"});
        } 
        if (!isEmail) {
            return res.status(400).json({ error: "Please provide a valid email address"});
        } 
        const user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({ error: "User not found" })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({ error: "Password is incorrect" });
        }

        const access_token = createJWT(user.email, user.id, user.role, 604800);

        return res.status(200).json({
            success: true,
            token: access_token,
            message: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                mobileNumber: user.mobileNumber,
                gender: user.gender,

            }
        });

    } catch (error) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.'
        });
    }
}