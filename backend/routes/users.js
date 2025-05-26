const express = require('express');

const router = express.Router();

const userController = require('../controllers/userController');

router.post('/login', userController.user_login);
router.post('/signup', userController.user_signup);
router.post('/logout', userController.user_logout);

module.exports = router;