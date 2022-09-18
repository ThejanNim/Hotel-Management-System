const express = require('express');
const router = express.Router();

const { me, updatePassword, addUser, deleteUser } = require('../controllers/userController');
const auth = require('../middlewares/auth');
const adminAuth = require('../middlewares/admin');

router.post('/adduser', auth, adminAuth, addUser);
router.delete('/delete/:id', auth, adminAuth, deleteUser);
router.get('/me', auth, me);
router.get('/admin', auth, adminAuth, me)
router.put('/updatepassword', auth, updatePassword);

module.exports = router;