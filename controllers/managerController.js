const mongoose = require('mongoose');
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

// const connect = require('../db/connect');

// const start = async () => {
//   try {
//     await connect();
//     // console.log("connected to database");
//     // const created = await createInvitation({
//     //   user: {
//     //     id: mongoose.Types.ObjectId(),
//     //     company: 'HP',
//     //   },
//     //   headers: {
//     //     host: 'https://localhost:3000'
//     //   }
//     // });
//     // console.log(created);
//     // const newy = await Manager.find().exec();
//     // console.log(newy);
//   } catch (e) {
//     console.log(e);
//   }
// };
// start();

module.exports = {
  createInvitation,
};
