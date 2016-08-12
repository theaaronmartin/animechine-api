const express = require('express'),
          Cart = require('../models/cart');
          Product = require('../models/product');

const router = express.Router();

function addCartItem(req, res, cart) {
  function onProductFound(product) {
    function onError(err) {
      console.error(err);
      res.status(500).json(err);
    }

    function onCartAdded(cart) {
      res.json(cart);
    }

    cart.addItem(req.body.quantity, product)
      .then(onCartAdded)
      .catch(onError);
      }

    Product.findById(req.body.productId, function(err, product) {
      if (err || !product ) {
          res.status(404).send('Not found');
          return;
      }

      onProductFound(product);
    });
}
router.post('/', function (req, res) {
  var cart = new Cart();

  addCartItem(req, res, cart);
});

router.post('/:cartId/items', function(req, res) {
  function onCartFound(cart) {
    addCartItem(req, res, cart);
  }

  function onCartFinding(err, cart) {
    if (err || !cart ) {
        res.status(404).send('Not found');
        return;
    }

    onCartFound(cart);
  }

  Cart.findById(req.params.cartId, onCartFinding);
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
