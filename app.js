require('dotenv').config();
const path = require('path');
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');
const indexRouter = require('./routes/indexRouter');
const userRouter = require('./routes/userRouter');
const db = require('./config/database');

const ONE_DAY = 1000 * 60 * 60 * 24;

// --------- CREATE THE EXPRESS APP ---------
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ------------- VIEWS SETUP -------------
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// ------------ SESSION SETUP ------------
const sessionStore = new MongoStore({
  mongooseConnection: db,
  collection: 'sessions',
});

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: { maxAge: ONE_DAY },
  })
);

// ------------ PASSPORT SETUP ------------
require('./config/passport');

app.use(passport.initialize());
app.use(passport.session());

// -- MAKE CURRENTUSER UNIVERSALLY ACCESSIBLE --
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

// --------------- ROUTES ---------------
app.use('/', indexRouter);
app.use('/users', userRouter);

// --------------- SERVER ---------------
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));
