const express = require('express'),
          mongoose = require('mongoose'),
          logger = require('morgan'),
          bodyParser = require('body-parser'),
          passport = require('passport'),
          session = require('express-session'),
          LocalStrategy = require('passport-local').Strategy,
          bcrypt = require('bcrypt');

const app = express();

const Admin = require('./models/admin');

// Database
mongoose.connect('mongodb://localhost/animechine-api');

const db = mongoose.connection;
db.on('error', function(err) {
  console.error(err);
});
db.once('open', function() {
  console.log('Connected to Animechine Database.');
});

// Middleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(
  function(username, password, done) {
    Admin.findOne({ username: username }, function (err, admin) {
      if (err) { return done(err); }
      if (!admin) { return done(null, false); }
      if (!admin.verifyPassword(password)) { return done(null, false); }
      return done(null, admin);
    });
  }
));

app.post('/login',
  passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

// file:app/authentication/middleware.js
function authenticationMiddleware () {
  return function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/');
  };
}

// app.get('/admins', passport.authenticationMiddleware(), renderProfile);

// Routes
app.use('/admins', require('./routes/admins'));
app.use('/products', require('./routes/products'));
app.use('/cart', require('./routes/carts'));

// Run Application
app.listen(3001, function () {
  console.log('Animechine Engaged!');
});
