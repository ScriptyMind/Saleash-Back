const mongoose = require('mongoose');

const managerSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    company: {
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

const Manager = mongoose.model('manager', managerSchema);

module.exports = Manager;
