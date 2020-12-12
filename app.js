require('dotenv').config();
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/user');

const { json } = express;

mongoose.connect(process.env.DB_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongo connection error'));

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(json());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ username }, (err, user) => {
      if (err) return done(err);
      if (!user) return done(null, false, { msg: 'Incorrect username' });
      if (user.password !== password)
        return done(null, false, { msg: 'Incorrect password' });
      return done(null, user);
    });
  })
);

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser((id, done) =>
  User.findById(id, (err, user) => done(err, user))
);

app.get('/', (req, res) => res.send({ user: req.user }));

app.post('/sign-up', async (req, res, next) => {
  new User({
    username: req.body.username,
    password: req.body.password,
  }).save((err) => {
    if (err) return next(err);
    res.redirect('/');
  });
});

app.post(
  '/log-in',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/',
  })
);

app.get('/log-out', (req, res) => {
  req.logout();
  res.redirect('/');
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));
