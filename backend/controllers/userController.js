const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const passport = require('passport');

const user_check_auth = (req, res) => {
    if(req.isAuthenticated()){
        res.json({authenticated: true, redirect: '/'});
    } else{
        res.json({authenticated: false, redirect: '/login'});
    }
}
const user_login = (req, res) => {
    res.status(200).json({redirect: '/', user: req.user})
}
const user_signup = async (req, res) => {
    const { username, password} = req.body;

    const saltRounds = 10;
    const hashedPw = await bcrypt.hash(password, saltRounds);

    User.create({username, password: hashedPw})
    .then(result => res.status(200).json({result, redirect: '/login'}))
}
const user_logout = (req, res) => {
    req.logout(() => {
        res.json({redirect: '/login'})
    })
}

module.exports = {
    user_check_auth,
    user_login,
    user_signup,
    user_logout
}