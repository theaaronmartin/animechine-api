const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CartSchema = new Schema({
  productName: { type: String, trim: true, default: '' },
  size: { type: String, trim: true, default: '' },
  color: { type: String, trim: true, default: '' },
  price: { type: Number, trim: true, default: '' }
});

// Validations
CartSchema.path('productName').required(true, 'Your cart cannot be empty');

module.exports = mongoose.model('Cart', CartSchema);
