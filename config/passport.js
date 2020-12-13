const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/user');

passport.use(
  new LocalStrategy(async (username, password, done) => {
    const user = await User.findOne({ username });
    if (!user) return done(null, false, { msg: 'Incorrect username' });
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return done(null, false, { msg: 'Incorrect password' });
    return done(null, user);
  })
);

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser((id, done) =>
  User.findById(id, (err, user) => done(err, user))
);
