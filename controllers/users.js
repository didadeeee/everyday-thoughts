const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const userCtrl = require('../controllers/users');

const saltRounds = 10;

const isAuth = async (req, res, next) => {
if (req.session.userid) {
const user = await User.findById(req.session.userid).exec();
res.locals.user = user;
next();
} else {
res.status(403).send(req.session);
}
};

// starting from users/
const newAccount = function(req, res, next){
res.render('users/newaccount');
}

async function create(req, res, next) {
try {
// store the results of any asynchronous calls in variables
// and use the await keyword before them
const password = await bcrypt.hash(req.body.password, saltRounds);
const user =  await User.create( {name: req.body.name, email: req.body.email, password});
res.status(201).redirect('/users/login');
} catch (error) {
// return the next callback and pass it the error from catch
  return next(error);
}
};

const login = function(req, res, next) {
  const { email, password } = req.body;
  res.render('users/login', { msg: '' });
}

async function signIn (req, res, next){
const { email, password } = req.body;
const user = await User.findOne({ email }).exec();
if (user === null){
const context = { msg: "User does not exist" };
//how shall i change the login text to logout
res.render("users/login", context)
return;
} 
bcrypt.compare(password, user.password, (err, result) => {
if (result) {
req.session.email = user.email;
res.redirect("/");
} else {
const context = { msg: "Incorrect Password" };
res.render("users/login", context);
}
});
};
    

module.exports = {
newAccount,
create,
login,
signIn
}