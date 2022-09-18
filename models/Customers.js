const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customersSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mobileNo: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    state: {
        type: String
    },
    city: {
        type: String
    },
    gender: {
        type: String,
        required: true
    },
    age: {
        type: String
    }
})

module.exports = mongoose.model('Customers', customersSchema);