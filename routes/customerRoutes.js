const express = require('express');
const router = express.Router();

const {addCustomers} = require('../controllers/customerController');
const auth = require('../middlewares/auth');
const adminAuth = require('../middlewares/admin');

router.post('/addcustomer', auth, adminAuth, addCustomers);

module.exports = router;