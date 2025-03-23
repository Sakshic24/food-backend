const express = require("express");
const cors = require("cors"); // Enable CORS if necessary
const app = express();
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecret = "MynameisEndtoEnd$#";

// Enable CORS if you need cross-origin requests
app.use(cors());
app.use(express.json()); // Make sure to parse JSON bodies


// Route to login a user
router.post(
  "/loginuser",
  [
    body("email").isEmail().withMessage("Invalid email format."),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long."),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { email, password } = req.body;

      // Check if user exists
      let userData = await User.findOne({ email });
      if (!userData) {
        return res.status(400).json({ errors: "Invalid credentials" });
      }

      // Check if the password matches
      const isMatch = await bcrypt.compare(password, userData.password);
      if (!isMatch) {
        return res.status(400).json({ errors: "Invalid credentials" });
      }

      // Generate auth token
      const payload = {
        user: {
          id: userData._id, // Using '_id' because MongoDB generates _id as the identifier
        },
      };
      const authToken = jwt.sign(payload, jwtSecret, { expiresIn: "1h" });

      res.json({ success: true, authToken });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ success: false, error: "Server error: " + error.message });
    }
  }
);

module.exports = router;
