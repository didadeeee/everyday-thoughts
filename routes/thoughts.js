var express = require('express');
var router = express.Router();

const thoughtCtrl = require('../controllers/thoughts');

// starting from /
router.get('/books/thoughts/:id', thoughtCtrl.index);
// router.get('/newthought', thoughtCtrl.show);
router.post('/books/:id/thoughts', thoughtCtrl.createThought);
router.put('/books/:bookId/thoughts/:thoughtId', thoughtCtrl.updateThought);
// router.delete('thoughts/:id', thoughtCtrl.deleteThought);

module.exports = router;