const express = require("express");
const bcrypt = require("bcrypt");
const Book = require("../models/book");

function newBook(req, res) {
  if (req.session) {
    const isLoggedIn = true;
  } else {
    const isLoggedIn = false;
  }
  res.render("books/new");
}

async function index(req, res) {
  try {
    const books = await Book.find({});
    const isLoggedIn = true;
    res.render("books/index", { books, isLoggedIn });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
}

async function create(req, res, next) {
  try {
    const newBook = await Book.create(req.body);
    res.redirect("/books");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
}

async function editBook(req, res) {
  try {
    const id = req.params.id;
    const book = await Book.findById(id);
    const isLoggedIn = true;
    res.render("books/edit", { book, isLoggedIn });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
}

async function updateBook(req, res, next) {
  try {
    const id = req.params.id;
    const context = req.body;
    const books = await Book.findByIdAndUpdate(id, {
      bookTitle: context.bookTitle,
      quote: context.quote,
    });
    res.redirect("/books");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
}

async function deleteBook(req, res, next) {
  try {
    const id = req.params.id;
    const books = await Book.findByIdAndDelete(id);
    res.redirect("/books");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
}

module.exports = {
  newBook,
  index,
  create,
  editBook,
  updateBook,
  deleteBook,
};
