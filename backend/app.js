const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport')
const LocalStrategy = require('passport-local');
const session = require('express-session');
const bcrypt = require('bcrypt');
const logger = require('./logger');
require('dotenv').config();

//attempts var
const MAX_ATTEMPTS = 5;
const LOCK_TIME = 5 * 1000; //5 second locktime

//routes
const noteRoutes = require('./routes/notes');
const userRoutes = require('./routes/users');

const User = require('./models/userModel');

const app = express();

const dbURI = `mongodb+srv://${process.env.name}:${process.env.password}@le-note.9oon4wa.mongodb.net/le-note?retryWrites=true&w=majority&appName=le-note`;

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
mongoose.connect(dbURI)
    .then(res => app.listen(process.env.PORT))
    .catch(err => console.log(err));

app.use(express.json());

app.use(session({
    secret: process.env.secret,
    resave: false,
    saveUninitialized: false,
}))
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy({passReqToCallback: true}, (req, username, password, done) => {
    User.findOne({ username: username })
        .then(async data => {
            const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

            if (!data) {
                logger.warn(`Login failed: No user with that name ${username}`);
                return done(null, false, { message: 'No user with that name' })}
            // auto-unlock if lock expired
            if (data.isLocked && data.lockUntil <= Date.now()) {
                data.isLocked = false;
                data.failedAttempts = 0;
                data.lockUntil = null;
                await data.save();
            }

            if (data.isLocked) {
                logger.warn(`Account locked with username: ${username} ip: ${ip}`);
                return done(null, false, { message: "Account locked. Try again later." });
            }
            if (await bcrypt.compare(password, data.password) == false) {
                data.failedAttempts += 1;

                if (data.failedAttempts >= MAX_ATTEMPTS) {
                    data.isLocked = true;
                    data.lockUntil = new Date(Date.now() + LOCK_TIME);
                    await data.save();
                    return done(null, false, { message: 'Account locked. Try again later.' });
                }

                logger.warn(`Login failed incorrect password: ${username} ip: ${ip}`)
                await data.save();
                return done(null, false, { message: 'Invalid credentials' });
            }
            //reset on successful login
            data.failedAttempts = 0;
            data.isLocked = false;
            data.lockUntil = null;
            await data.save();
            logger.info(`Login successful with username: ${username} ip: ${ip}`);
            return done(null, data)
        })
}))

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(result => { return done(null, result) })
        .catch(err => {logger.error(err); console.log(err)});
})

app.use('/api/notes', noteRoutes);
app.use('/user', userRoutes);

app.use((req, res, next) => {
  next(createError(`Route ${req.method} ${req.originalUrl} not found`, 404));
});

app.use((err, req, res, next) => {
  logger.error(`${err.status || 500} - ${err.message} - ${req.method} ${req.originalUrl}`);
  res.status(err.status || 500).send(err.message);
});