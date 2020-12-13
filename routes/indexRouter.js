const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const User = require('../models/user');

const router = express.Router();

router.get('/', (req, res) => {
  console.log('index');
  res.send({ user: req.user });
});

router.post('/sign-up', async (req, res, next) => {
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
});

router.post(
  '/log-in',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/',
  })
);

router.get('/log-out', (req, res) => {
  console.log('log out');
  req.logout();
  res.redirect('/');
});

module.exports = router;
