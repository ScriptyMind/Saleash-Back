const mongoose = require('mongoose');

const orderSchema = mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
      default: Date.now
    },
    deliveryDate: {
      type: Date,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    manager: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'manager',
      required: true,
    },
    driver: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'driver',
      required: true,
    },
    agent: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'manager',
    },
    client: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'client',
    },
    product: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'product',
      required: true,
    }
  },
  { timestamps: true }
);

const Order = mongoose.model('order', orderSchema);

module.exports = Order;
