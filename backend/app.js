const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport')
const LocalStrategy = require('passport-local');
const session = require('express-session');
const bcrypt = require('bcrypt');
require('dotenv').config();

//routes
const noteRoutes = require('./routes/notes');
const userRoutes = require('./routes/users');

const User = require('./models/userModel');

const app = express();

const dbURI = `mongodb+srv://${process.env.name}:${process.env.password}@le-note.9oon4wa.mongodb.net/le-note?retryWrites=true&w=majority&appName=le-note`;

app.use(cors())
mongoose.connect(dbURI)
    .then(res => app.listen(process.env.PORT))
    .catch(err => console.log(err));

app.use(express.json());

app.use(session({
    secret: process.env.secret,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy((username, password, done) => {
    User.findOne({ username: username})
        .then(async data => {
            if(!data){ return done(null, false, { message: 'no user with that name'})}
            if(await bcrypt.compare(password, data.password) == false){
                return done(null, false);
            } return done(null, data)
        })
}))

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(result => done(null, result))
        .catch(err => console.log(err));
})

app.use('/api/notes', noteRoutes);
app.use('/user', userRoutes);