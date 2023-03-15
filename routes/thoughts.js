var express = require('express');
var router = express.Router();
const thoughtCtrl = require('../controllers/thoughts');
const User = require('../models/user');

// starting from /
router.get('/books/thoughts/:id', thoughtCtrl.index);
router.post('/books/:id/thoughts', thoughtCtrl.createThought);
// router.put('/books/:bookId/thoughts/:thoughtId', thoughtCtrl.updateThought);
router.delete('books/:bookId/thoughts/:thoughtId', thoughtCtrl.deleteThought);

module.exports = router;