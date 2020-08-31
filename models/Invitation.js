const mongoose = require('mongoose');

const invitationSchema = mongoose.Schema(
  {
    company: {
      type: String,
      required: true,
    },
    manager: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'manager',
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'user',
    },
    state: {
      type: String,
      required: true,
      enum: ['pending', 'expired', 'accepted'],
      default: 'pending',
    },
  },
  { timestamps: () => new Date() }
);

const Invitation = mongoose.model('invitation', invitationSchema);
module.exports = Invitation;
