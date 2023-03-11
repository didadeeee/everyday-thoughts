var express = require('express');
var router = express.Router();
const Book = require('../models/book');

// starting from books
router.get('/new', function (req, res) {
res.render('books/new');
});

router.get('/', async function index(req, res) {
  try { const books = await Book.find({});
  res.render('books/index', { books });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
  });

router.get('/:id', async function show(req, res) {
const book = await Book.findById(req.params.id);
res.render('books/show', { book });
});


router.post('/', async function(req, res, next) {
const newBook = await Book.create(req.body);
res.redirect('/books')
});

router.get('/edit/:id', async function (req, res) {
  const { id } = req.params;
  res.render('books/edit', { id });
});

router.put('/edit/:id', async function(req, res, next) {
const id = req.params.id;
const context = req.body;
const books = await Book.findByIdAndUpdate(id, { bookTitle: context.bookTitle, quote: context.quote });
res.redirect('/books');
});

router.delete('/:id', async function(req, res, next) {
const id = req.params.id;
const books = await Book.findByIdAndDelete(id);
res.redirect('/books');
});


module.exports = router;