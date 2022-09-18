const RoomTypes = require('../models/RoomTypes');

exports.addRoomTypes = async (req, res) => {
    try {
        const {title, shortcode, adultCapacity, kidsCapacity, basePrice, roomTypeStatus, roomFacilities} = req.body;

    if (!title || !shortcode || !adultCapacity || !kidsCapacity || !basePrice || !roomStatus ) {
            return res.status(400).json({Error: "Please Provide Room Types details."});
        }

        const roomTypes = new RoomTypes({
            title: title,
            shortcode: shortcode,
            adultCapacity: adultCapacity,
            kidsCapacity: kidsCapacity,
            basePrice: basePrice,
            roomTypeStatus: roomTypeStatus,
            roomFacilities: roomFacilities
        });
        
        roomTypes.save().then(response => {
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

exports.allRoomTypes = async (req, res) => {
    try {
        RoomTypes.find({}).then(function(allroomtypes) {
            res.status(200).json(allroomtypes);
        }).catch(err => {
            res.status(400).json({error: "Sorry, Can't get List of room types"});
        })
    } catch (error) {
        return res.status(400).json({ error: 'Your request could not be processed. Please try again.'});    
    }
}