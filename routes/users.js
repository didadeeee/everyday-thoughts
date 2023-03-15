var express = require('express');
var router = express.Router();
const User = require('../models/user');
const userCtrl = require('../controllers/users');

//starting from users
router.get('/newaccount', userCtrl.newAccount);
router.post('/signup', userCtrl.create);
router.get('/login', userCtrl.login);
router.post('/login', userCtrl.signIn);
router.get("/logout", userCtrl.isAuth, userCtrl.signOut);

module.exports = router;