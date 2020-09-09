const mongoose = require('mongoose');
const managerService = require('../services/managerService');
const invitationService = require('../services/invitationService');
const parentService = require('../services/parentService');
const driverService = require('../services/driverService');
const User = require('../models/User');
const Manager = require('../models/Manager');

const createInvitation = async (req, res) => {
  const invitation = {
    manager: req.user.id,
    company: req.user.company,
    link: `${req.headers.host}/api/invitation/${mongoose.Types.ObjectId()}`
  };
  try {
    const created = await invitationService.createOne(invitation);
    res.status(201).json({ data: created });
  } catch (e) {
    console.log(e);
    res.status(400).end();
  }
};

const deleteInvitation = async (req, res) => {
  try {
    const deleted = await invitationService.deleteOne({
      _id: req.body.id,
      manager: req.user.id
    });
    res.status(200).json({ data: deleted });
  } catch (e) {
    console.log(e);
    res.status(400).end();
  }
};

const deleteDriver = async (req, res) => {
  try {
    const manager = managerService.deleteDriver(req.user.id, req.body.driver.id);
    console.log(manager);
    res.status(200).json({ data: manager });
  } catch (e) {
    console.log(e);
    res.status(400).end();
  }
};

// const connect = require('../db/connect');
// const Invitation = require('../models/Invitation');

// const start = async () => {
//   try {
//     await connect();
//     console.log('connected to database');
//     const drivers = await deleteDriver()
//     console.log(drivers);
//   } catch (e) {
//     console.log(e);
//   }
// };
// start();

module.exports = {
  createInvitation,
  deleteInvitation,
  deleteDriver
};
