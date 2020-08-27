const mongoose = require('mongoose');

const driverSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    vehicul: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'user',
      required: true,
      unique: true,
    },
  },
);

const Driver = mongoose.model('driver', driverSchema);
module.exports = Driver;
