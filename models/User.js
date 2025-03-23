// SCHEMA OF USER CRUD OPERATIONS//
/* user.js me user ki SCHEMA banane ke baad router banayege creatuser me data (post karayege)create krege aur index.js me MIDDLEWARES ki help se send send krege mongodb me */

const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("user", UserSchema);
