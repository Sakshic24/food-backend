// payment.js in Routes directory
const express = require('express');
const router = express.Router();

// Define payment route (you can customize this to handle payment logic)
router.post('/payment', (req, res) => {
  // Your payment logic here
  res.send('Payment route is working!');
});

module.exports = router;
