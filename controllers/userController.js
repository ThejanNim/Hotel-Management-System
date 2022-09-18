const User = require('../models/User');
const validator = require('validator');
const bcrypt = require('bcrypt');

exports.addUser = async (req, res) => {
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

exports.deleteUser = async (req, res) => {
    try {
                User.findByIdAndRemove(req.params.id)
                    .then(function () {
                        res.status(200).json("Crud deleted");
                    })
                    .catch(function (err) {
                        res.status(400).send("Crud delete failed.");
                    });
    } catch (error) {
        res.status(400).json({error: "error in catch"})
    }
}

exports.me = async (req, res) => {
    try {
        const userName = await User.findById(req.user.userId); 
        return res.status(200).json({ message: "User Profile:", userName });
    } catch (error) {
        res.status(401).json( "Unauthorized" );
    }
}

exports.updatePassword = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        const password = user.password;
        
        const isPasswordMatched = await bcrypt.compare(req.body.currentPassword, password);

        if (!isPasswordMatched) {
            return res.status(400).json({error: "Current Password is Invalid"})
        }

        user.password = req.body.newPassword;

        bcrypt.hash(user.password, 10, function (err, hash) {
            user.password = hash;
            user.save().then(response => {
                res.status(200).json({
                    success: true,
                    result: response,
                    message: "Your Password is changed"
                })
            })
        })

    } catch (error) {
        return res.status(400).json({error: "Failed"});
    }  
} 

