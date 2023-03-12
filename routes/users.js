var express = require('express');
var router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const { createUserToken } = require('../middleware/auth');
const {
  handleValidateId,
  handleRecordExists,
  handleValidateOwnership,
} = require('../middleware/custom_errors');
const { requireToken } = require('../middleware/auth');


const saltRounds = 10;

router.get('/newaccount', function(req, res, next){
res.render('users/newaccount');
})

// SIGN UP // POST /api/signup
// Using async/await
// Add the async keyword
router.post('/signup', async (req, res, next) => {
try {
// store the results of any asynchronous calls in variables
// and use the await keyword before them
const password = await bcrypt.hash(req.body.password, saltRounds);
const user =  await User.create( {name: req.body.name, email: req.body.email, password});
res.status(201).json(user);
} catch (error) {
// return the next callback and pass it the error from catch
  return next(error);
}
});

/* GET users listing. */
router.get('/login', function(req, res, next) {
  res.render('users/login');
});

// SIGN IN
// POST /api/signin
router.post('/signin', async (req, res, next) => {
try {
const user = await User.findOne({ email: req.body.email });
const token = await createUserToken(req, user);
res.json({token});
} catch (error){
next(error);
}
});


module.exports = router;
