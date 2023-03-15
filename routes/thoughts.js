var express = require('express');
var router = express.Router();
const thoughtCtrl = require('../controllers/thoughts');

// starting from /
router.get('/books/thoughts/:id', thoughtCtrl.index);
router.post('/books/:id/thoughts', thoughtCtrl.createThought);
router.delete('/books/:bookId/thoughts/:thoughtId', thoughtCtrl.deleteThought);

module.exports = router;