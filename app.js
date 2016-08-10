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

// app.use('/products', (function(req, res, next) {
//   Admin.findById(req.get('Authorization'), function(err, admin) {
//     if (err || admin === null) {
//       res.status(401).send('You must be logged in to view this page');
//       return;
//     }
//
//     req.admin = admin;
//     next();
//   });
// }));


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
app.use('/carts', require('./routes/carts'));

// Run Application
app.listen(3002, function () {
  console.log('Animechine Engaged!');
});
