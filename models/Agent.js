const mongoose = require('mongoose');

const agentSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
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
  { timestamps: true }
);

const Agent = mongoose.model('agent', agentSchema);
module.exports = Agent;
