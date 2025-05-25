const express = require('express')

const router = express.Router();

const noteController = require('../controllers/noteController');

//fetch notes
router.get('/', noteController.note_get);

//get single note
router.get('/:id', noteController.note_get_one);

//post note
router.post('/', noteController.note_post);

//delete note
router.delete('/:id', noteController.note_del);

//update
router.patch('/:id', noteController.note_update);

module.exports = router;