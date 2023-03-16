var express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");

function fetchData(){
  return fetch("https://api.goprogram.ai/inspiration")
      .then(res => res.json())
}

router.get("/", async(req, res) => {
  const quote = await fetchData()
  res.render("index", { quote, isLoggedIn:false });
});

module.exports = router;