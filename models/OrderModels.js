const mongoose = require("mongoose");

// ref will be come from their models
const OrderSchema = new mongoose.Schema(
  {
    products: [
      {
        type: mongoose.ObjectId,
        ref: "products",
      },
    ],
    payment: {},
    buyer: {
      type: mongoose.ObjectId,
      ref: "users",
    },
    status: {
      type: String,
      default: "Not Process",
      enum: ["Not Process", "Processing", "Shipping ", "Deliverd", "cancel"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("order", OrderSchema);
