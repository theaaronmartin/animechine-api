const express = require('express'),
          Admin = require('../models/admin');

const router = express.Router();

router.post('/', function (req, res) {
  var admin = new Admin(req.body);
  console.log(req.body);

  admin.save((function(err) {
      if (err) {
        console.log(err);
        res.status(422).json(err);
        return;
      }

      res.json(admin);
    }));
});

router.get('/', function (req, res) {
  Admin.find({}, function (err, admins) {
    res.json(admins);
  });
});

router.get('/:id', function(req, res) {
  Admin.findById(req.params.id)
    .populate('name', 'username')
    .exec(function(err, post) {
      res.json(admin);
    });
});

module.exports = router;
