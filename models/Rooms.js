const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roomSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    roomType: {
        type: String,
        required: true
    },
    roomNo: {
        type: String,
        required: true  
    },
    price: {
        type: Number,
        required: true
    },
    floor: {
        type: String,
        required: true
    },
    roomStatus: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Rooms', roomSchema);