const mongoose = require('mongoose');
const managerService = require('../services/managerService');
const invitationService = require('../services/invitationService');

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
    const manager = await managerService.deleteDriver(req.user.id, req.body.driver.id);
    console.log(manager);
    res.status(200).json({ data: manager });
  } catch (e) {
    console.log(e);
    res.status(400).end();
  }
};

const getDrivers = async (req, res) => {
  try {
    const drivers = await managerService.getAllDrivers(req.user.id);
    res.status(200).json({ data: drivers });
  } catch (e) {
    console.log(e);
    res.status(400).end();
  }
};

const connect = require('../db/connect');
const parentService = require('../services/parentService');
const User = require('../models/User');

const start = async () => {
  try {
    await connect();
    console.log("connected");
    const manager = await parentService(User).getAll();
    console.log(manager);
  } catch (e) {
    console.log(e);
  }
};

start();

module.exports = {
  createInvitation,
  deleteInvitation,
  deleteDriver,
  getDrivers
};
