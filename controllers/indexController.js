const bcrypt = require('bcrypt');
const passport = require('passport');
const _ = require('lodash');
const User = require('../models/user');

exports.index = (req, res) => {
  console.log('index');
  res.send({ user: req.user });
};

exports.signup_get = (req, res) => {
  res.send('sign-up get');
};

exports.signup_post = async (req, res, next) => {
  console.log('sign-up post');

  let user = await User.findOne({ username: req.body.username });
  if (user) return res.status(400).send('User already registered');

  user = new User(
    _.pick(req.body, ['username', 'password', 'firstName', 'lastName'])
  );
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(req.body.password, salt);

  user.save((err) => {
    if (err) return next(err);
    res.redirect('/');
  });
};

exports.login_get = (req, res) => res.send('log-in get');

exports.login_post = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/',
});

exports.logout_get = (req, res) => {
  console.log('log out');
  req.logout();
  res.redirect('/');
};
