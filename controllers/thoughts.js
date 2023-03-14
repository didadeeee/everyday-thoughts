const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const Book = require("../models/book");
const { findByIdAndRemove } = require("../models/user");

// const isAuth = async (req, res, next) => {
// if (req.session.userid) {
//     const user = await User.findById(req.session.userid).exec();
//     res.locals.user = user;
//     next();
// } else {
//     res.status(403).send(req.session);
// }
// };

// const show = function(req, res, next) {
// const id = req.params.id;
// res.render('books/newthought', { id });
// }

async function index(req, res) {
  try {
    const id = req.params.id;
    const book = await Book.findById(id);
    res.render("books/thoughts", { book });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
}

async function createThought(req, res, next) {
  try {
    const id = req.params.id;
    const book = await Book.findById(id);
    book.thoughts.push(req.body);
    await book.save();
    res.redirect(`/books/${id}/edit`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
}

// async function updateThought (req, res){
// const bookId = req.params.bookId;
// const thoughtId = req.params.thoughtId;
// console.log('thoughtid', thoughtId);
// const thought = req.body.thought;
// console.log('thought', thought);
// try {
// const book = await Book.findById(bookId)
// const foundThought = book.thoughts.find(thought => thought._id.toString() === thoughtId);
// console.log('found', foundThought);
// if (foundThought) {
//     foundThought.thought = thought;
//     await book.save();
// }
//     res.redirect(`/books/${bookId}/edit`);
// } catch (err) {
//     console.error(err);
//     res.status(500).send('Server Error');
// }
// }

async function deleteThought(req, res) {
  try {
    const bookId = req.params.bookId;
    const thoughtId = req.params.thoughtId;
    console.log("thoughtid", thoughtId);
    const book = await Book.findById(bookId);
    console.log('book', book);
    const foundThought = book.thoughts.find(thought => thought._id.toString() === thoughtId);
    foundThought.thought.findByIdAndRemove(thoughtId);
    console.log("foundThought", foundThought);
    await book.save();
    res.send('succesfully deleted');
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
}

module.exports = {
  createThought,
  index,
  deleteThought
};
