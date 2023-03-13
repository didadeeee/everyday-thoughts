var express = require('express');
var router = express.Router();
const User = require('../models/user');
const userCtrl = require('../controllers/users');

const isAuth = async (req, res, next) => {
if (req.session.userid) {
const user = await User.findById(req.session.userid).exec();
res.locals.user = user;
next();
} else {
res.status(403).send(req.session);
}
};

//starting from user
router.get('/newaccount', userCtrl.newAccount);
router.post('/signup', userCtrl.create);
router.get('/login', userCtrl.login);
router.post('/login', userCtrl.signIn);

router.get('/secret', isAuth, function(req,res){
res.send('this is a secret');
})

module.exports = router;
