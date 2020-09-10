const express = require('express');
const passport = require('passport');
const authController = require('../../controllers/authController');
require('../../config/passport');

const authRouter = express.Router();

authRouter.post('/register', authController.register);

authRouter.post('/login', passport.authenticate('local', { session: false }), authController.login);

authRouter.get('/logout', passport.authenticate('jwt', { session: false }), authController.logout);

authRouter.get('/authenticated', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { user } = req;
  res.status(200).json({ isAuthenticated: true, user });
});

module.exports = authRouter;
