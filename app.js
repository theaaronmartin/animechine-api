const express = require('express'),
          mongoose = require('mongoose'),
          logger = require('morgan'),
          bodyParser = require('body-parser'),
          session = require('express-session'),
          cors = require('cors'),
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
app.use(cors());
app.use(bodyParser.json());



// passport.use(new LocalStrategy(
//   function(username, password, done) {
//     Admin.findOne({ username: username }, function (err, admin) {
//       if (err) { return done(err); }
//       if (!admin) { return done(null, false); }
//       if (!admin.verifyPassword(password)) { return done(null, false); }
//       return done(null, admin);
//     });
//   }
// ));
//
// app.post('/login',
//   passport.authenticate('local', { failureRedirect: '/login' }),
//   function(req, res) {
//     res.redirect('/');
//   });

// file:app/authentication/middleware.js
// function authenticationMiddleware () {
//   return function (req, res, next) {
//     if (req.isAuthenticated()) {
//       return next();
//     }
//     res.redirect('/');
//   };
// }

// app.get('/admins', passport.authenticationMiddleware(), renderProfile);

// app.use('/admins', (function(req, res, next) {
//   Admin.findById(req.get('Authorization'), function(err, admin) {
//
//     if (err || admin === null) {
//       res.status(401).send('You must be logged in to view this page');
//       return;
//     }
//
//     req.admin = admin;
//     next();
//   });
// }));

app.use('/products', (function(req, res, next) {
  Admin.findById(req.get('Authorization'), function(err, admin) {
    // If admin doesn't exist, respond with Unauthorized
    if (err || admin === null) {
      res.status(401).send('You must be logged in to view this page');
      return;
    }

    // Else add user to req.admin and go to next route
    req.admin = admin;
    next();
  });
}));


// MAKE A NEW ADMIN IF NONE

// app.use(/^\/(?!admins).*/, function(req, res, next) {
//   Admin.findById(req.get('Authorization'), function(err, admin) {
//
//     if (err || admin === null) {
//       res.send(401, 'You\'re not authorized');
//       return;
//     }
//
//     req.admin = admin;
//     next();
//   });
// });

// Routes
app.use('/admins', require('./routes/admins'));
app.use('/products', require('./routes/products'));
app.use('/cart', require('./routes/carts'));

// Run Application
app.listen(3002, function () {
  console.log('Animechine Engaged!');
});
