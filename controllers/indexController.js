const bcrypt = require('bcrypt');
const passport = require('passport');
const _ = require('lodash');
const User = require('../models/user');

exports.index = (req, res) => res.render('index');

exports.signup_get = (req, res) => res.render('sign-up');

exports.signup_post = async (req, res, next) => {
  try {
    let user = await User.findOne({ username: req.body.username });
    if (user) return res.status(400).send('User already registered');

    user = new User(
      _.pick(req.body, ['username', 'password', 'firstName', 'lastName'])
    );
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.password, salt);

    user.save((err) => {
      if (err) return next(err);
      // Redirect the post req to /log-in so a newly signed-up user is automatically logged in
      return res.redirect(307, '/log-in');
    });
  } catch (e) {
    next(e);
  }
};

exports.login_get = (req, res) => res.render('log-in');

exports.login_post = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/',
});

exports.logout_get = (req, res) => {
  req.logout();
  res.redirect('/');
};
