// Order route to handle checkout
const express = require('express');
const router = express.Router();
const Order = require('../models/Order'); // Import your order model

// POST route to create an order
router.post('/myorder', async (req, res) => {
  const { totalAmount, items } = req.body;

  // Create a new order object
  const newOrder = new Order({
    totalAmount: totalAmount,
    items: items, // Cart items
    status: 'Pending', // Initially, set order status to Pending
    createdAt: new Date(),
  });

  try {
    // Save the order to the database
    const savedOrder = await newOrder.save();

    // Respond with the order ID
    res.json({ orderId: savedOrder._id });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create order' });
  }
});
router.get('/order/:id', (req, res) => {
    const orderId = req.params.id;
  
    Order.findById(orderId)
      .then(order => {
        if (!order) {
          return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json(order);
      })
      .catch(error => {
        console.error('Error fetching order:', error);
        res.status(500).json({ message: 'Error fetching order details', error: error });
      });
  });
  router.post('/order', (req, res) => {
    const { totalAmount, items } = req.body;
    
    const newOrder = new Order({
      totalAmount,
      items,
      status: 'pending', // Or any status you want to assign
    });
  
    newOrder.save()
      .then(order => {
        res.status(201).json({
          orderId: order._id, // Return the order ID to frontend
        });
      })
      .catch(error => {
        res.status(500).json({ message: 'Error creating order', error: error });
      });
  });

module.exports = router;
