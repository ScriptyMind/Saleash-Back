const mongoose = require('mongoose');
const Invitation = require('../models/Invitation');

const getAccepted = async (req, res) => {
  try {
    const invitations = await Invitation.find({ manager: req.user.id, state: 'accepted' })
      .sort({ createdAt: -1 })
      .lean()
      .exec();
    res.status(200).json({ data: invitations });
  } catch (e) {
    console.log(e);
    res.status(400).end();
  }
};

const getPending = async (req, res) => {
  try {
    const invitations = await Invitation.find({ manager: req.user.id, state: 'pending' })
      .sort({ createdAt: -1 })
      .lean()
      .exec();
    res.status(200).json({ data: invitations });
  } catch (e) {
    console.log(e);
    res.status(400).end();
  }
};

const getExpired = async (req, res) => {
  try {
    const invitations = await Invitation.find({ manager: req.user.id, state: 'expired' })
      .sort({ createdAt: -1 })
      .lean()
      .exec();
    res.status(200).json({ data: invitations });
  } catch (e) {
    console.log(e);
    res.status(400).end();
  }
};

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
  // eslint-disable-next-line prefer-destructuring
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

const deleteMany = async (req, res) => {
  try {
    const removed = await Invitation.deleteMany({
      _id: {
        $in: req.body.ids
      },
      // eslint-disable-next-line no-underscore-dangle
      manager: req.user.id,
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

const updateOne = async (req, res) {
  try {
    const updated = await Invitation.findOneAndUpdate(
      {
        _id: req.body.id,
      },
      {
         state: req.body.state,
         user: req.user.id
      }
    );
    if (!updated)
      res.status(400).end();
    return res.status(200).json({ data: updated });
  } catch (e) {
    console.log(e);
    res.status(400).end();
  }
}

module.exports = {
  getAll,
  getPending,
  getExpired,
  getAccepted,
  createOne,
  deleteOne,
  deleteMany,
  updateOne,
};
