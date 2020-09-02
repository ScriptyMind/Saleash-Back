const mongoose = require('mongoose');

const clientSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    adress: {
      type: String,
      required: true,
    },
    user: {
      ref: mongoose.SchemaTypes.ObjectId,
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

const Client = mongoose.model('client', clientSchema);

module.exports = Client;
