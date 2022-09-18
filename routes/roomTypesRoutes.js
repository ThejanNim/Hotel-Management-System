const express = require('express');
const router = express.Router();

const {addRoomTypes} = require('../controllers/roomTypesController');
const auth = require('../middlewares/auth');
const adminAuth = require('../middlewares/admin');

router.post('/', auth, adminAuth, addRoomTypes);

module.exports = router;