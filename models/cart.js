const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CartSchema = new Schema({
  product: { type: String, trim: true, default: '' },
  size: { type: String, trim: true, default: '' },
  color: { type: String, trim: true, default: '' },
  price: { type: String, trim: true, default: '' }
});

// Validations
CartSchema.path('product').required(true, 'Your cart cannot be empty');

module.exports = mongoose.model('Cart', CartSchema);
