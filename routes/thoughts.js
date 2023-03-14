var express = require('express');
var router = express.Router();
const thoughtCtrl = require('../controllers/thoughts');
const User = require('../models/user');

const isAuth = async (req, res, next) => {
    if (req.session.userid) {
      const user = await User.findById(req.session.userid).exec();
      console.log(req.session.userid);
      res.locals.user = user;
      next();
    } else {
      context = { msg: "Login to Access the Full Features :) "}
      res.render('users/login', context)
    }
  };

// starting from /
router.get('/books/thoughts/:id', thoughtCtrl.index);
router.post('/books/:id/thoughts', thoughtCtrl.createThought);
// router.put('/books/:bookId/thoughts/:thoughtId', thoughtCtrl.updateThought);
router.delete('books/:bookId/thoughts/:thoughtId', thoughtCtrl.deleteThought);

module.exports = router;