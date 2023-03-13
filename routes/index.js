var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');


const isAuth = async (req, res, next) => {
if (req.session.userid) {
    const user = await User.findById(req.session.userid).exec();
    res.locals.user = user;
    next();
} else {
    res.status(403).send(req.session);
}
};

// starting from home page
router.get('/', function(req, res, next) {
  res.render('index');
});

module.exports = router;
