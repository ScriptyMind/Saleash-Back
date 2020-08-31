const mongoose = require('mongoose');
const Invitation = require('../models/Invitation');

const getAll = async (req, res) => {
  try {
    const invitations = await Invitation.find({ manager: req.user.id })
      .sort({ createdAt: -1 })
      .lean()
      .exec();
    res.status(200).json({ data: invitations });
  } catch (e) {
    console.log(e);
    res.status(400).end();
  }
};

const createOne = async (req, res) => {
  // eslint-disable-next-line no-underscore-dangle
  const manager = req.user._id;
  const company = req.user.company;
  const link = `${req.url}/${mongoose.Types.ObjectId()}`;
  try {
    const invitation = await Invitation.create({ company, manager, link });
    res.status(201).json({ data: invitation });
  } catch (e) {
    console.log(e);
    res.status(400).end();
  }
};

const deleteOne = async (req, res) => {
  try {
    const removed = await Invitation.findOneAndRemove({
      _id: req.params.id,
      manager: req.user._id,
    });
    if (!removed) {
      return res.status(400).end();
    }
    return res.status(200).json({ data: removed });
  } catch (e) {
    console.log(e);
    res.status(400).end();
  }
};
