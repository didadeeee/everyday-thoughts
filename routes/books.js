var express = require('express');
var router = express.Router();
const bookCtrl = require('../controllers/books');

// starting from books
router.get('/new', bookCtrl.newBook);
router.get('/', bookCtrl.index);
router.get('/:id', bookCtrl.show);
router.post('/', bookCtrl.create);
router.get('/edit/:id', bookCtrl.editBook);
router.put('/edit/:id', bookCtrl.updateBook);
router.delete('/:id', bookCtrl.deleteBook);

module.exports = router;  