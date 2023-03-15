var express = require("express");
var router = express.Router();
const bookCtrl = require("../controllers/books");
const userCtrl = require("../controllers/users")

// starting from books
router.get("/new", userCtrl.isAuth, bookCtrl.newBook);
router.get("/", userCtrl.isAuth, bookCtrl.index);
router.post("/", bookCtrl.create);
router.get("/:id/edit", bookCtrl.editBook);
router.put("/:id/edit", bookCtrl.updateBook);
router.delete("/:id", bookCtrl.deleteBook);

module.exports = router;
