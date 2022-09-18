const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    mobileNumber: {
        type: String,
        required: true
    }, 
    gender: {
        type: String,
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
    } 
},{
    timestamps: true,
    collection: 'users'
})
module.exports = mongoose.model('User', userSchema);