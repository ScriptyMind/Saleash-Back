const JWT = require('jsonwebtoken');
const User = require('../models/User');
const parentService = require('../services/parentService');

const signToken = (id, email, name) => {
  const options = { expiresIn: '1day' };
  return JWT.sign({
    iss: 'Saleash',
    sub: id,
    email,
    name
  }, 'S3cr3t', options);
};

module.exports.register = async (req, res) => {
  const { email, password, name } = req.body;
  try {
    const exist = await parentService(User).checkIfExist({ email });
    if (exist) return res.status(400).json({ message: 'Account already exists', msgError: false });
    const user = await parentService(User).createOne({ email, password, name });
    return res.status(201).json({ data: user });
  } catch (error) {
    res.status(500).json({ message: 'Error has occured', msgError: true });
  }
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
