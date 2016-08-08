const express = require('express'),
          Product = require('../models/product');

const router = express.Router();

router.post('/', function (req, res) {
  var product = new Product(req.body);

  product.save((function(err) {
      if (err) {
        res.json(422, err);
        return;
      }

      res.json(product);
    }));
});

router.get('/', function (req, res) {
  Product.find({}, function (err, products) {
    res.json(products);
  });
});

router.get('/:id', function(req, res) {
  Product.findById({ _id: req.params.id }, function (err, product) {
    res.json(product);
  });
});

router.patch('/:id', function(req, res) {
    Product.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, function(err, product) {
      res.json(product);
    });
});

router.delete('/:id', function(req, res) {
  Product.findOneAndRemove({ _id: req.params.id }, function(err, product) {
    res.json(true);
  });
});

module.exports = router;
