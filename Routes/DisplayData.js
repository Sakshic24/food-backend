const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

// Define Mongoose models for food_items and foodCategory (use singular, not plural, in model names)
const FoodItem = mongoose.model(
  "food_items",
  new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    img: String, // Assuming you have this field for the image
  })
);

const FoodCategory = mongoose.model(
  "foodCategory",
  new mongoose.Schema({
    name: String,
    description: String,
  })
);

// Endpoint to get food items and categories
router.post("/auth/foodData", async (req, res) => {
  try {
    // Fetching food items and categories from MongoDB
    const foodItems = await FoodItem.find(); // Correct model name here
    const foodCategories = await FoodCategory.find(); // Correct model name here

    // Sending the data as a JSON response
    res.status(200).json([foodItems, foodCategories]);
  } catch (error) {
    // console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
