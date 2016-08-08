const express = require('express'),
          Cart = require('../models/cart');

const router = express.Router();

router.post('/', function (req, res) {
  var cart = new Cart(req.body);

  cart.save((function(err) {
      if (err) {
        res.json(422, err);
        return;
      }

      res.json(cart);
    }));
});

router.get('/:id', function(req, res) {
  Cart.findById(req.params.id)
    .populate('cart', 'product')
    .exec(function(err, post) {
      res.json(cart);
    });
});

module.exports = router;
