const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const saltRounds = 10;

function fetchData() {
  return fetch("https://api.goprogram.ai/inspiration").then((res) =>
    res.json()
  );
}

async function homePage(req, res) {
  const quote = await fetchData();
  if (req.session.isLoggedIn) {
    const isLoggedIn = true;
    res.render("index", { quote, isLoggedIn });
  } else {
    const isLoggedIn = false;
    res.render("index", { quote, isLoggedIn });
  }
}

function newAccount(req, res) {
  context = { isLoggedIn: false, errormsg: "" };
  res.render("users/newaccount", context);
}

async function create(req, res, next) {
  try {
    const password = await bcrypt.hash(req.body.password, saltRounds);
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password,
    });
    context = {
      isLoggedIn: false,
      msg: "Account Succesfully Created! Login to Begin your Everyday Thoughts!",
    };
    res.status(201).render("users/login", context);
  } catch (error) {
    if (error.code === 11000) {
      context = {
        errormsg: "There's a duplicate, try again?",
        isLoggedIn: false,
      };
      res.render("users/newaccount", context);
    }
    if (error.name === "ValidationError") {
      context = {
        errormsg: "Invalid Details. Try Again?",
        isLoggedIn: false,
      };
      res.render("users/newaccount", context);
    } else {
      return next(error);
    }
  }
}

const login = function (req, res) {
  const email = req.body.email;
  const password = req.body.password;
  const isLoggedIn = false;
  res.render("users/login", { msg: "", isLoggedIn });
};

async function signIn(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;
  const quote = await fetchData();
  const user = await User.findOne({ email }).exec();
  if (!user) {
    const context = { msg: "User does not exist", isLoggedIn: false };
    res.render("users/login", context);
    return;
  }
  bcrypt.compare(password, user.password, (err, result) => {
    if (result) {
      req.session.userId = user._id;
      req.session.isLoggedIn = true;
      req.session.quote = quote;
      res.render("index", req.session);
    } else {
      const context = { msg: "Incorrect Password", isLoggedIn: false };
      res.render("users/login", context);
    }
  });
}

const signOut = async (req, res) => {
  if (req.session) {
    req.session.destroy();
  }
  res.render("users/login", { msg: "", isLoggedIn: false });
};

const isAuth = async (req, res, next) => {
  if (req.session.userId) {
    const user = await User.findById(req.session.userId).exec();
    res.locals.user = user;
    isLoggedIn = true;
    next();
  } else {
    res.status(403).redirect("/users/newaccount");
  }
};

module.exports = {
  newAccount,
  create,
  login,
  signIn,
  signOut,
  isAuth,
  homePage,
};
