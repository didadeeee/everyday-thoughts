const express = require("express");
const bcrypt = require("bcrypt");
const Book = require("../models/book");

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

async function deleteThought(req, res) {
  try {
    const bookId = req.params.bookId;
    const thoughtId = req.params.thoughtId;
    const book = await Book.findById(bookId);
    const foundThought = book.thoughts.find(
      (thought) => thought._id.toString() === thoughtId
    );
    foundThought.deleteOne(thoughtId);
    await book.save();
    res.redirect(`/books/${bookId}/edit`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
}

module.exports = {
  index,
  createThought,
  deleteThought,
};
