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
    drivers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'driver' }],
    agents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'agent' }]
  },
  { timestamps: true }
);

const Manager = mongoose.model('manager', managerSchema);

module.exports = Manager;
