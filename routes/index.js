var express = require("express");
var router = express.Router();
const userCtrl = require('../controllers/users');

router.get("/", userCtrl.homePage);

module.exports = router;
