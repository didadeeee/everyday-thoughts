const Book = require("../models/book");

async function index(req, res) {
  try {
    const books = await Book.find({});
    res.render("books/index", { books, isLoggedIn: true });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
}
