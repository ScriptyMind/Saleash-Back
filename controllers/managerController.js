const Manager = require('../models/Manager');

const getOne = async (req, res) => {
  try {
    const manager = await Manager.findById(req.params.id).lean().exec();
    if (!manager) return res.status(400).end();
    res.status(200).json({ data: manager });
  } catch (e) {
    return res.status(400).end();
  }
};

const getAll = async (req, res) => {
  try {
    const managers = await Manager.find({}).lean().excec();
    if (!managers) return res.status(400).end();
    res.status(200).json({ data: managers });
  } catch (e) {
    return res.status(400).end();
  }
};

const createOne = async (req, res) => {
  try {
    const created = await Manager.create(req.body);
    res.status(201).json({ data: created });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

const updateOne = async (req, res) => {
  try {
    const updated = await Manager.findByIdAndUpdate(req.user.id, req.body, { new: true })
      .lean()
      .exec();
    if (!updated) {
      return res.status(400).end();
    }
    res.status(200).json({ data: updated });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

const deleteOne = async (req, res) => {
  try {
    const removed = await Manager.findByIdAndRemove(req.user.id)
      .lean()
      .exec();
    if (!removed) {
      return res.status(400).end();
    }
    res.status(200).json({ data: removed });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

module.exports = {
  createOne,
  updateOne,
  getAll,
  getOne,
  deleteOne,
};
