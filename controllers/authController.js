const JWT = require('jsonwebtoken');
const User = require('../models/User');

const signToken = (id, email, name) => {
  const options = { expiresIn: '1day' };
  return JWT.sign({
    iss: 'Saleash',
    sub: id,
    email,
    name
  }, 'S3cr3t', options);
};

module.exports.register = (req, res) => {
  const { email, password, name } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err) res.status(500).json({ message: 'Error has occured', msgError: true });

    if (user) res.status(400).json({ message: 'Email already exist', msgError: true });
    else {
      const newUser = new User({ email, password, name });
      newUser.save((err2) => {
        if (err2) res.status(500).json({ message: 'Error has occured', msgError: true });
        else {
          res.status(201).json({ message: 'Account created', msgError: false });
        }
      });
    }
  });
};

module.exports.login = (req, res) => {
  if (req.isAuthenticated()) {
    const { _id, email, name } = req.user;
    const token = signToken(_id, email, name);
    res.cookie('access_token', token, { httpOnly: true, sameSite: true });
    res.status(200).json({ isAuthenticated: true, user: { email, name } });
  }
};

module.exports.logout = (req, res) => {
  res.clearCookie('access_token');
  res.json({ user: { email: '', name: '' }, success: true });
};
