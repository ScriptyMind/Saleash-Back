const mongoose = require('mongoose');

const invitationSchema = mongoose.Schema(
  {
    state: {
      type: String,
      required: true,
      enum: ['pending', 'expired', 'accepted'],
      default: 'pending',
    },
    phone: {
      type: String,
      required: true,
    },
    manager: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'manager',
      required: true,
    },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'user',
      required: true,
    },
  },
);

const Invitation = mongoose.model('invitation', invitationSchema);
module.exports = Invitation;
