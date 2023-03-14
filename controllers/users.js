const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const userCtrl = require("../controllers/users");

const saltRounds = 10;

// starting from users/
const newAccount = function (req, res, next) {
  res.render("users/newaccount");
};

async function create(req, res, next) {
  try {
    // store the results of any asynchronous calls in variables
    // and use the await keyword before them
    const password = await bcrypt.hash(req.body.password, saltRounds);
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password,
    });
    res.status(201).render("users/login", {
      msg: "Account Succesfully Created! Login to Access Full Features :)",
    });
  } catch (error) {
    // return the next callback and pass it the error from catch
    return next(error);
  }
}

const login = function (req, res, next) {
  const { email, password } = req.body;
  res.render("users/login", { msg: "" });
};

async function signIn(req, res, next) {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).exec();
  if (!user) {
    const context = { msg: "User does not exist" };
    //how shall i change the login text to logout
    res.render("users/login", context);
    return;
  }
  bcrypt.compare(password, user.password, (err, result) => {
    if (result) {
      req.session.userid = user._id;
       context = {isLoggedIn:true }
      res.render("index", context);
    } else {
      const context = { msg: "Incorrect Password", isLoggedIn:false };
      res.render("users/login", context);
    }
  });
}

const signOut = async (req, res) => {
  if (req.session) {
    req.session.destroy();
    console.log("Session end");
  }
  res.redirect("/");
}

module.exports = {
  newAccount,
  create,
  login,
  signIn,
  signOut
};
