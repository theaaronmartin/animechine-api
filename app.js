const express = require('express'),
          mongoose = require('mongoose'),
          logger = require('morgan'),
          bodyParser = require('body-parser'),
          passport = require('passport');

const app = express();

const Admin = require('./models/admin');

// Database

mongoose.connect('mongodb://localhost/animechine-api');

const db = mongoose.connection;
db.on('error', function(err) {
  console.error(err);
});
db.once('open', function() {
  console.log('Connected to Animechine databse.');
});

// Middleware
app.use(logger('dev'));
app.use(bodyParser.json());

app.post('/login',
  passport.authenticate('local'),
  function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    res.redirect('/users/' + req.user.username);
  });

// Routes
app.use('/admins', require('./routes/admins'));
app.use('/products', require('./routes/products'));
app.use('/carts', require('./routes/carts'));

// Run Application
app.listen(3000, function () {
  console.log('Animechine engaged!');
});
