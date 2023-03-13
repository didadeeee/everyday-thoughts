const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const Book = require('../models/book')

const isAuth = async (req, res, next) => {
if (req.session.userid) {
    const user = await User.findById(req.session.userid).exec();
    res.locals.user = user;
    next();
} else {
    res.status(403).send(req.session);
}
};
  

function newBook(req, res) {
res.render('books/new')
}

async function index(req, res) {
try {
const books = await Book.find({});
res.render('books/index', { books });
} catch (err) {
console.error(err);
res.status(500).send('Server Error');
}
}

async function show(req, res) {
try {
const book = await Book.findById(req.params.id);
res.render('books/show', { book });
} catch (err) {
console.error(err);
res.status(500).send('Server Error');
}
}

async function create (req, res, next) {
try {
const newBook = await Book.create(req.body);
res.redirect('/books')
} catch (err) {
console.error(err);
res.status(500).send('Server Error');
}
}

async function editBook (req, res) {
try {
const { id } = req.params;
    res.render('books/edit', { id });
} catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
}
}

async function updateBook(req, res, next) {
try {
const id = req.params.id;
const context = req.body;
const books = await Book.findByIdAndUpdate(id, { bookTitle: context.bookTitle, quote: context.quote });
res.redirect('/books');
} catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
}
}
    
async function deleteBook(req, res, next) {
try {
const id = req.params.id;
const books = await Book.findByIdAndDelete(id);
res.redirect('/books');
} catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
}
}

module.exports = {
newBook,
index,
show,
create,
editBook,
updateBook,
deleteBook
}