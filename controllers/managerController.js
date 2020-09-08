const mongoose = require('mongoose');
const managerService = require('../services/managerService');
const invitationService = require('../services/invitationService');
const parentService = require('../services/parentService');
const User = require('../models/User');

const createInvitation = async (req, res) => {
  const invitation = {
    manager: req.user.id,
    company: req.user.company,
    link: `${req.headers.host}/api/invitation/${mongoose.Types.ObjectId()}`
  };
  try {
    const created = await invitationService.createOne(invitation);
    // res.status(201).json({ data: created });
    return created;
  } catch (e) {
    console.log(e);
    //  res.status(400).end();
  }
};

const deleteInvitation = async (req, res) => {
  try {
    const deleted = await invitationService.deleteOne({
      _id: req.body.id,
      manager: req.body.manager
    });
    res.status(200).json({ data: deleted });
  } catch (e) {
    console.log(e);
    res.status(400).end();
  }
};

const connect = require('../db/connect');
const Invitation = require('../models/Invitation');

const start = async () => {
  try {
    await connect();
    console.log('connected to database');
    // const user = await parentService(User).updateOne({
    //   name: 'Taha',
    //   email: 'mtahabaz@gmail.com',
    // }, { role: 'manager' }, { new: true });
    // console.log(user);
    // const user = await parentService(User).createOne({
    //   name: 'Taha',
    //   email: 'mtahabaz@gmail.com',
    //   password: '123456',
    //   role: 'driver'
    // });
    // console.log(`User Id: ${user.id}`);
    // const manager = await managerService.createOne({
    //   name: 'taha',
    //   phone: '3303030030',
    //   company: 'DELL',
    //   user: '5f579426d6fc4b0a56097533',
    // });
    // console.log(`Manager Id: ${manager.id}`);
    // const created = await createInvitation({
    //   user: {
    //     id: '5f5794b3261dba0adb4c419d',
    //     company: 'DELL',
    //   },
    //   headers: {
    //     host: 'https://localhost:3000'
    //   }
    // });
    // console.log(created);
    // const newy = await managerService.getAll();
    // console.log(newy);
    const invi = await parentService(Invitation).getAll();
    console.log(invi);
  } catch (e) {
    console.log(e);
  }
};
start();

module.exports = {
  createInvitation,
  deleteInvitation
};
