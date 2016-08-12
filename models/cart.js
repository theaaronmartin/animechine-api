const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CartSchema = new Schema({
  number: { type: Number }, // TODO
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  items: [{
    product: { type: Schema.Types.ObjectId, ref: 'Product' },
    quantity: { type: Number, default: 0 }
    }],
  total: { type: Number, default: 0 }
});

// Validations
// CartSchema.path('productName').required(true, 'Your cart cannot be empty');

CartSchema.methods.addItem = function (quantity, product) {
  this.items.push(
    {
      product: product._id,
      quantity: quantity
    }
  );

  return this.save();
};

module.exports = mongoose.model('Cart', CartSchema);
