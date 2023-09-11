const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  }
  // Add more fields as needed, such as shippingAddress, orders, etc.
});

const User = mongoose.model('User', userSchema);

module.exports = User;