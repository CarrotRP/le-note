const express = require('express');
const passport = require('passport');
const logger = require('../logger')

const router = express.Router();

const userController = require('../controllers/userController');

router.get('/check-auth', userController.user_check_auth)
router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) return next(err);
        if (!user) {
            return res.status(400).json({ msg: info?.message });
        }

        req.logIn(user, async (err) => {
            if (err) return next(err);

            await userController.user_login(req, res);
        });
    })(req, res, next);
});
router.post('/signup', userController.user_signup);
router.post('/logout', userController.user_logout);
router.get('/admin', checkRole('admin'), (req, res) => res.json({msg: 'yeh'}));

function checkRole(role){
    return(req, res, next) => {
        const user = req.user;
        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        
        if(!user) {logger.warn(`user ${user.username} not authenticated, accessing otther page`); return res.status(401).json({msg: 'not authenticated'})};

        if(role.includes(user.role)) {logger.info(`user ${user.username} with role - ${user.role} access admin ip: ${ip}`);return next();}

        logger.warn(`user ${user.username} with role - ${user.role} try to access admin but blocked ip: ${ip}`);
        res.status(403).json({msg: 'Forbidden cuh'})
    }
}

module.exports = router;