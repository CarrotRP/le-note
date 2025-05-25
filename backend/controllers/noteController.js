const Note = require('../models/noteModel');

const note_get = (req, res) => {
    Note.find()
        .then(result => res.json(result));
}
const note_get_one = (req, res) => {
    const id = req.params.id;
    Note.findById(id)
        .then(result => res.json(result))
        .catch(err => console.log(err))
};

const note_post = (req, res) => {
    const { title, body } = req.body;

    Note.create({ title, body })
        .then(result => res.status(200).json(result));
}
const note_del = (req, res) => {
    const id = req.params.id;
    Note.findByIdAndDelete(id)
        .then(result => res.json(result))
        .catch(err => console.log(err));

}
const note_update = (req, res) => {
    const id = req.params.id;
    const { title, body } = req.body;

    Note.findByIdAndUpdate(id, { title, body })
        .then(result => res.json(result))
        .catch(err => console.log(err));
}

module.exports = {
    note_get,
    note_get_one,
    note_post,
    note_del,
    note_update
}