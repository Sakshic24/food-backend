const express = require("express");
const cors = require("cors"); // Enable CORS if necessary
const app = express();
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecret = "MynameisEndtoEnd$#";
app.use(cors());
app.use(express.json()); // Make sure to parse JSON bodies

// Route to create a new user
router.post(
  "/createuser",
  [
    body("name").notEmpty().withMessage("Name is required."),
    body("email").isEmail().withMessage("Invalid email format."),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long."),
    body("address").notEmpty().withMessage("Address is required."),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name, email, password, address } = req.body;

      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ errors: "User already exists." });
      }

      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create a new user in the database
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
        address,
      });
      await newUser.save();

      res.json({ success: true, message: "User created successfully" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ success: false, error: "Server error: " + error.message });
    }
  }
);
module.exports = router;
