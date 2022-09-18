const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roomTypeSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    shortcode: {
        type: String,
        required: true
    },
    adultCapacity: {
        type: String,
        required: true
    },
    kidsCapacity: {
        type: String,
        required: true
    },
    basePrice: {
        type: String,
        required: true
    },
    roomStatus: {
        type: String,
        required: true
    },
    roomFacilities: {
        type: String
    }
})

module.exports = mongoose.model('RoomTypes', roomTypeSchema);