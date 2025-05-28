const express = require('express');
const passport = require('passport');

const router = express.Router();

const userController = require('../controllers/userController');

router.get('/check-auth', userController.user_check_auth)
router.post('/login', passport.authenticate('local', { failureMessage: true}), userController.user_login);
router.post('/signup', userController.user_signup);
router.post('/logout', userController.user_logout);

module.exports = router;