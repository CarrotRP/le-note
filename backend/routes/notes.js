const express = require('express')

const router = express.Router();

const noteController = require('../controllers/noteController');

//check auth
router.get('/check-auth', noteController.note_check_auth);

//fetch notes
router.get('/', checkAuth, noteController.note_get);

//get single note
router.get('/:id', noteController.note_get_one);

//post note
router.post('/', checkAuth, noteController.note_post);

//delete note
router.delete('/:id', noteController.note_del);

//update
router.patch('/:id', checkAuth, noteController.note_update);

module.exports = router;

function checkAuth(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.status(401).json({message: 'not authenticated' });
}