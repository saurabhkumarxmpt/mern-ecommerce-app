// models/Order.js
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  orderItems: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      name: String,
      image: String,
      price: Number,
      quantity: Number,
    }
  ],

  shippingAddress: {
    fullName: String,
    phone: String,
    address: String,
    apartment: String,
    city: String,
    state: String,
    country: String,
    postalCode: String
  },

  paymentMethod: {
    type: String,
    default: "COD"
  },

  totalPrice: {
    type: Number,
    required: true
  },

  isPaid: {
    type: Boolean,
    default: false
  },

  orderStatus: {
    type: String,
    default: "Processing"
  }

}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);
