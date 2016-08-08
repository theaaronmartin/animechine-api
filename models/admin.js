const mongoose = require('mongoose');

const Schema =  mongoose.Schema;

const AdminSchema = new Schema({
  username: { type: String, trim: true, default: '' },
  password: { type: String, trim: true, default: '' }
});

// Validations
AdminSchema.path('username').required(true, 'Username is required.');
AdminSchema.path('password').required(true, 'Password is required.');

module.exports = mongoose.model('Admin', AdminSchema);
