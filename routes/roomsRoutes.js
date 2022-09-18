const express = require('express');
const router = express.Router();

const {addRooms , allRooms} = require('../controllers/roomsController');
const auth = require('../middlewares/auth');
const adminAuth = require('../middlewares/admin');

router.post('/addrooms', auth, adminAuth, addRooms);
router.get('/allrooms', auth, adminAuth, allRooms);

module.exports = router;