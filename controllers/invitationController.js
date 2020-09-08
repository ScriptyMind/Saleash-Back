const mongoose = require('mongoose');
const invitationService = require('../services/invitationService');
const driverService = require('../services/driverService');
const parentService = require('../services/parentService');
const User = require('../models/User');
const agentService = require('../services/agentService');

const acceptInvitation = async (req, res) => {
  try {
    const user = await parentService(User).createOne(req.body.user);
    let userType = null;
    if (req.body.role === 'driver') {
      userType = await driverService.createOne({ ...req.body.driver, user: user.id });
    } else if (req.body.role === 'agent') {
      userType = await agentService.createOne({ ...req.body.agent, user: user.id });
    }
    const invitation = await invitationService.updateOne(
      { _id: req.body.id },
      {
        state: 'accepted',
        user: userType.id
      },
      req.body.role
    );
    res.status(200).json({ data: invitation });
  } catch (e) {
    console.log(e);
    res.status(400).end();
  }
};

const rejectInvitation = async (req, res) => {
  try {
    const invitation = await invitationService.updateOne(
      { _id: req.body.id },
      {
        state: 'rejected',
      },
      req.body.role
    );
    res.status(200).json({ data: invitation });
  } catch (e) {
    console.log(e);
    res.status(200).end();
  }
};

module.exports = {
  acceptInvitation,
  rejectInvitation
};
