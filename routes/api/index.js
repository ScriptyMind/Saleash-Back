const express = require('express');
const invitationRouter = require('./Invitation');

const apiRouter = express.Router();

apiRouter.use('/invitation', invitationRouter);

module.exports = apiRouter;
