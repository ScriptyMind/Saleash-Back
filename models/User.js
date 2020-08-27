const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: mongoose.SchemaTypes.Email,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    Role: {
      type: String,
      enum: ['manager', 'driver', 'agent'],
      required: true,
    },
  },
);

const User = mongoose.model('user', userSchema);

module.exports = User;
