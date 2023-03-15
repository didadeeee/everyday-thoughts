const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const Book = require("../models/book");


function newBook(req, res) {
  res.render("books/new");
}

async function index(req, res) {
  try {
    const books = await Book.find({});
    res.render("books/index", { books });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
}

async function show(req, res) {
  try {
    const book = await Book.findById(req.params.id);
    const thoughts = await book.thoughts;
    console.log(thoughts);
    res.render("books/show", { book, thoughts });
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
    const { id } = req.params;
    const book = await Book.findById(id);
    res.render("books/edit", { book });
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
  show,
  create,
  editBook,
  updateBook,
  deleteBook,

};
