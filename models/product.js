const mongoose = require('mongoose');

const Schema =  mongoose.Schema;

const ProductSchema = new Schema({
  productName: { type: String, trim: true, default: '' },
  size: { type: String, trim: true, default: '' },
  color: { type: String, trim: true, default: '' },
  price: { type: Number, trim: true, default: '' }
});

// Validations
ProductSchema.path('productName').required(true, 'You must enter a product in order for it to be sold.');
ProductSchema.path('size').required(true, 'Size is required.');
ProductSchema.path('color').required(true, 'Color is required.');
ProductSchema.path('price').required(true, 'Price is required.');

module.exports = mongoose.model('Product', ProductSchema);
