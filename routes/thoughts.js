var express = require('express');
var router = express.Router();
const Book = require('../models/book');
const thought = require('../models/thought');
const thoughtCtrl = require('../controllers/thoughts');

// starting from /
router.get('/thoughts', thoughtCtrl.index);
router.get('/newthought', thoughtCtrl.show);
router.get('/books/thoughts/:id', thoughtCtrl.newThought);
router.post('/books/thoughts/:id', thoughtCtrl.createThought);
router.get('/thoughts/edit/:id', thoughtCtrl.editThought);
router.put('thoughts/edit/:id', thoughtCtrl.updateThought);
router.delete('thoughts/:id', thoughtCtrl.deleteThought);

module.exports = router;