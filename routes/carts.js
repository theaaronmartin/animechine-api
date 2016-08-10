const express = require('express'),
          Cart = require('../models/cart');

const router = express.Router();

router.post('/', function (req, res) {
  var cart = new Cart(req.body);
  console.log(req.body);

  cart.save((function(err) {
      if (err) {
        res.status(422).json(err);
        return;
      }

      res.json(cart);
    }));
});

router.get('/', function (req, res) {
  Cart.find({}, function (err, carts) {
    res.json(carts);
  });
});

router.get('/:id', function(req, res) {
  Cart.findById(req.params.id)
    .populate('cart', 'product')
    .exec(function(err, post) {
      res.json(cart);
    });
});

router.delete('/:id', function(req, res) {
  Cart.findOneAndRemove({ _id: req.params.id }, function(err, cart) {
    res.json(true);
  });
});

module.exports = router;
