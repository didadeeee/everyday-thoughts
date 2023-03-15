var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');

// starting from home page
router.get('/', function(req, res, next) {
  context = { isLoggedIn:false }
  res.render('index', context);
});

module.exports = router;
