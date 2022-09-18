const express = require('express');
const router = express.Router();

const {addRoomTypes, allRoomTypes} = require('../controllers/roomTypesController');
const auth = require('../middlewares/auth');
const adminAuth = require('../middlewares/admin');

router.post('/', auth, adminAuth, addRoomTypes);
router.get('/allroomtypes', auth, adminAuth, allRoomTypes);

module.exports = router;