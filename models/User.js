<<<<<<< HEAD
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
=======
/* eslint-disable func-names */
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String
  },
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
  date: {
    type: Date,
    default: Date.now,
  },
  drivers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Driver' }],
});

// Hash the password before submit to database
UserSchema.pre('save', function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  bcrypt.hash(this.password, 10, (err, passwordHash) => {
    if (err) {
      return next(err);
    }
    this.password = passwordHash;
    return next();
  });
});

// Compare password hash
UserSchema.methods.comparePassword = function (password, cb) {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    if (err) {
      return cb(err);
    }
    if (!isMatch) {
      return cb(err, isMatch);
    }
    return cb(err, this);
  });
};

module.exports = mongoose.model('users', UserSchema);
>>>>>>> 8dcca79eb0a62ac595b4772b12771eddc53e9dc2
