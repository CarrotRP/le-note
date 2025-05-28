const Note = require('../models/noteModel');
const User = require('../models/userModel');

const note_check_auth = (req, res) => {
    if(req.isAuthenticated()){
        res.json({authenticated: true});
    } 
}
const note_get = (req, res) => {
    Note.find({owner: req.user._id})
        .then(result => res.json(result));
}
const note_get_one = (req, res) => {
    const id = req.params.id;
    Note.findById(id)
        .then(result => res.json(result))
        .catch(err => console.log(err))
};

const note_post = (req, res) => {
    const { title, body, owner } = req.body;

    Note.create({ title, body, owner })
        .then(result => {
            User.findByIdAndUpdate(owner, { $push: { notes: result._id}})
            .then(() => {
                res.status(200).json(result)
            })
        });
}
const note_del = (req, res) => {
    const id = req.params.id;
    Note.findByIdAndDelete(id)
        .then(result => {
            User.findByIdAndUpdate(req.user._id, {$pull: { notes: id}})
            .then(() => {
                res.json(result)
            })
        })
        .catch(err => console.log(err));

}
const note_update = (req, res) => {
    const id = req.params.id;
    const { title, body } = req.body;

    Note.findByIdAndUpdate(id, { title, body }, { new: true }) //set new:true return the result after update not before
        .then(result => res.json(result))
        .catch(err => console.log(err));
}

module.exports = {
    note_check_auth,
    note_get,
    note_get_one,
    note_post,
    note_del,
    note_update
}