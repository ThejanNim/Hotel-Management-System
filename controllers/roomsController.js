const Rooms = require('../models/Rooms');

exports.addRooms = async (req, res) => {
    try {
        const {name, roomType, roomNo, floor, roomStatus, price} = req.body;

        if (!name || !roomType || !roomNo || !floor || !roomStatus || !price ) {
            res.status(400).json({Error: "Please provide all room details"});
        }
        
        const room = new Rooms({
            name: name,
            roomType: roomType,
            roomNo: roomNo,
            floor: floor,
            price: price,
            roomStatus: roomStatus
        });

        room.save().then(response => {
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

    } catch (error) {
        return res.status(400).json({ error: 'Your request could not be processed. Please try again.'}); 
    }
}

exports.allRooms = async (req, res) => {
    try {
        const allrooms = await Rooms.find({});
        res.status(200).json({allrooms});
    } catch (error) {
        res.status(400).json({ error: 'Your request could not be processed. Please try again.'});
    }
}