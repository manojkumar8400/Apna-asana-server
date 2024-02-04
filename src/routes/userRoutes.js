const express = require('express');
const router = express.Router(); 
const {registerUser, loginUsers} = require('../controller/userController');

router.post('/register', registerUser);

router.post('/loginUser', loginUsers);

module.exports = router;