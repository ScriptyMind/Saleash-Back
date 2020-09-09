const mongoose = require('mongoose');
const managerService = require('../services/managerService');
const invitationService = require('../services/invitationService');
const driverService = require('../services/driverService');
const connect = require('../db/connect');

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

const getDrivers = async (managerId) => {
  try {
    // const driversIds = (await managerService.getMany({
    //   _id: managerId }, { drivers: 1, _id: 0
    // }))[0];
    // const drivers = await driverService.getAll( { $in: { _id: driversIds } });
    const drivers = await managerService.getAllDrivers(managerId);
    console.log(drivers);
  } catch (e) {
    console.log(e);
  }
};

const start = async () => {
  try {
    await connect();
    console.log('connected to db');
    await getDrivers('5f5794b3261dba0adb4c419d');
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
