const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const { createUserToken } = require('../middleware/auth');

const router = express.Router();


module.exports = router;