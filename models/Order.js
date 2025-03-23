// backend/models/Order.js

const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  items: [
    {
      name: String,
      price: Number,
      qty: Number,
    },
  ],
  totalAmount: Number,
  status: {
    type: String,
    default: 'Pending',  // Order status (Pending, Completed, Failed)
  },
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
