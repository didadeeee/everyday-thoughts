const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const Book = require('../models/book')
const Thought = require('../models/thought');

const isAuth = async (req, res, next) => {
if (req.session.userid) {
    const user = await User.findById(req.session.userid).exec();
    res.locals.user = user;
    next();
} else {
    res.status(403).send(req.session);
}
};

const show = function(req, res, next) {
const id = req.params.id;
res.render('books/newthought', { id });
}


async function index(req, res) {
try {
const id = req.params.id;
const thought = await Book.find({ id }).populate("thought");
res.render('books/thoughts', { id, thought })
} catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
}
}

async function newThought (req, res, next) {
try { 
const id = req.params.id;
const book = await Book.findById(id);
res.render('books/newthought', { book, id });
} catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
}
}

async function createThought(req, res, next){
try {
const id = req.params.id;
const newThought = await thought.create(req.body);
const books = await Book.findByIdAndUpdate(id, { thought: newThought._id });
res.redirect('thoughts');
} catch (err) {
console.error(err);
res.status(500).send('Server Error');
}
}

async function editThought(req, res) {
try {
const { id } = req.params;
res.render('books/editthought', { id });
} catch (err) {
console.error(err);
res.status(500).send('Server Error');
}
}

async function updateThought (req, res){
const id = req.params.id;
const userData = req.body;
try {
await Book.findByIdAndUpdate(id, userData );
res.status(200).json({ message: 'User updated successfully' });
} catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
}
}

async function deleteThought(req, res, next) {
const id = req.params.id;
try { 
const books = await Book.findByIdAndDelete(id);
res.redirect('/books');
} catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
}
}
  

module.exports = {
show,
index,
newThought,
createThought,
editThought,
updateThought,
deleteThought
}