const Manager = require('../models/Manager');
const Invitation = require('../models/Invitation');
const Agent = require('../models/Agent');
const parentService = require('./parentService');

const getAccepted = (id) => new Promise((resolve, reject) => {
  Invitation.find({
    manager: id,
    state: 'accepted',
  })
    .sort({ createdAt: -1 })
    .lean()
    .exec()
    .then((invitations) => resolve(invitations))
    .catch((e) => reject(e));
});

const getPending = (id) => new Promise((resolve, reject) => {
  Invitation.find({
    manager: id,
    state: 'pending',
  })
    .sort({ createdAt: -1 })
    .lean()
    .exec()
    .then((invitations) => resolve(invitations))
    .catch((e) => reject(e));
});

const getExpired = (id) => new Promise((resolve, reject) => {
  Invitation.find({
    manager: id,
    state: 'expired',
  })
    .sort({ createdAt: -1 })
    .lean()
    .exec()
    .then((invitations) => resolve(invitations))
    .catch((e) => reject(e));
});

const getAll = async (req, res) => {
  try {
    const invitations = await Invitation.find({ manager: req.user.id })
      .sort({ createdAt: -1 })
      .lean()
      .exec();
    res.status(200).json({ data: invitations });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

// const createOne = async (data) => {
//   // const manager = req.user.id;
//   // const company = req.user.company;
//   // const link = `${req.headers.host}/api/invitation/${mongoose.Types.ObjectId()}`;
//   try {
//     const invitation = await Invitation.create(data);
//     Promise.resolve(invitation);
//   } catch (e) {
//     console.error(e);
//     Promise.reject(e);
//   }
// };

const deleteMany = (idsFilter, managerId) => new Promise((resolve, reject) => {
  Invitation.deleteMany({
    _id: {
      $in: idsFilter,
    },
    manager: managerId,
  })
    .exec()
    .then((removed) => {
      if (!removed) {
        reject(new Error('something went wrong!'));
      }
      resolve(removed);
    })
    .catch((e) => reject(e));
});

const updateOne = (filter, data, role, manager) => new Promise((resolve, reject) => {
  Invitation.findOneAndUpdate(
    filter,
    data,
    { new: true }
  )
    .lean()
    .exec()
    .then((updated) => {
      if (!updated) reject(new Error('Something went wrong!'));
      if (updated.state === 'accepted') {
        if (role === 'driver') {
          parentService.updateOne(Manager)(manager.id,
            { $push: { drivers: filter.id } }, { new: true })
            .catch((e) => reject(e));
        } else if (role === 'agent') {
          parentService.updateOne(Agent)(manager.id,
            { $push: { drivers: filter.id } }, { new: true })
            .catch((e) => reject(e));
        }
      }
      resolve(updated);
    })
    .catch((e) => reject(e));
});

module.exports = {
  getAll,
  getPending,
  getExpired,
  getAccepted,
  deleteMany,
  updateOne,
  ...parentService(Invitation)
};
