var express = require('express');
var router = express.Router();
const Book = require('../models/book');

// starting from /
router.get('/newthought', function(req, res, next) {
  res.render('books/newthought')
});

router.get('/thoughts', async function index(req, res) {
  const books = await Book.find({});
  res.render('books/thoughts', { books })
});


router.get('/books/thought/:id', async function(req, res, next) {
  const id = req.params.id;
  const book = await Book.findById(id);
  res.render('books/newthought', { book, id });
});

router.post('books/thought/:id', async function(req, res, next) {
const id = req.params.id;
const books = await Book.findById(id);
books.push(req.body);
await books.save();
console.log(books);
res.redirect('books', { id } );
});

router.get('/thoughts/edit/:id', async function (req, res) {
const { id } = req.params;
res.render('books/editthought', { id });
});

router.put('thoughts/edit/:id', async function(req, res, next){
const id = req.params.id;
const context = req.body;
const books = await Book.findByIdAndUpdate(id, { thought: "testing"});
res.redirect('/thoughts', books);
});

router.delete('thoughts/:id', async function(req, res, next) {
  const id = req.params.id;
  const books = await Book.findByIdAndDelete(id);
  res.redirect('/books');
  });

module.exports = router;