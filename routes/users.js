var express = require('express');
var router = express.Router();
const User = require('../models/user');
const userCtrl = require('../controllers/users');

//starting from user
router.get('/newaccount', userCtrl.newAccount);
router.post('/signup', userCtrl.create);
router.get('/login', userCtrl.login);
router.post('/login', userCtrl.signIn);
router.post("/logout", userCtrl.signOut);

module.exports = router;
