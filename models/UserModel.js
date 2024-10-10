const mongoose = require("mongoose");

// Creating schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: {},
      required: true,
    },
    answer: { type: String, required: true },

    role: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt
);

// Creating the model
const users = mongoose.model("users", userSchema);

module.exports = users;
