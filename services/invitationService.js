const Manager = require('../models/Manager');
const Invitation = require('../models/Invitation');
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

const getAll = async (manager) => {
  try {
    const invitations = await Invitation.find(manager).lean().exec();
    if (!invitations) Promise.reject(new Error('Error occured'));
    Promise.resolve(invitations);
  } catch (e) {
    console.error(e);
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

const updateOne = (filter, data, role) => new Promise((resolve, reject) => {
  console.log(filter);
  console.log(data);
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
          parentService(Manager).updateOne(updated.manager,
            { $push: { drivers: data.user } }, { new: true })
            .then((res) => {
              console.log(res);
            })
            .catch((e) => reject(e));
        } else if (role === 'agent') {
          parentService(Manager).updateOne(updated.manager,
            { $push: { agents: data.user } }, { new: true })
            .then((res) => {
              console.log(res);
            })
            .catch((e) => reject(e));
        }
      }
      resolve(updated);
    })
    .catch((e) => reject(e));
});

module.exports = {
  ...parentService(Invitation),
  getAll,
  getPending,
  getExpired,
  getAccepted,
  deleteMany,
  updateOne,
};
