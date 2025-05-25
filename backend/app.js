const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

//routes
const noteRoutes = require('./routes/notes');

const app = express();

const dbURI = `mongodb+srv://${process.env.name}:${process.env.password}@le-note.9oon4wa.mongodb.net/le-note?retryWrites=true&w=majority&appName=le-note`;

app.use(cors())
mongoose.connect(dbURI)
    .then(res => app.listen(process.env.PORT))
    .catch(err => console.log(err));

app.use(express.json());

app.use('/api/notes', noteRoutes);

app.get('/', (req, res) => {
    res.json({ name: 'john' })
})