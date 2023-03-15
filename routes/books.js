var express = require("express");
var router = express.Router();
const bookCtrl = require("../controllers/books");
const User = require('../models/user');


const isAuth = async (req, res, next) => {
    if (req.session.userid) {
      const user = await User.findById(req.session.userid).exec();
      res.locals.user = user;
      next();
    } else {
      res.status(403).redirect('/users/newaccount');
    }
  };
  

// starting from books
router.get("/new", isAuth, bookCtrl.newBook);
router.get("/", bookCtrl.index);
router.get("/:id", bookCtrl.show);
router.post("/", bookCtrl.create);
router.get("/:id/edit", bookCtrl.editBook);
router.put("/:id/edit", bookCtrl.updateBook);
router.delete("/:id", bookCtrl.deleteBook);

module.exports = router;
