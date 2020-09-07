const invitationService = require('../services/invitationService');

const acceptInvitation = async (req, res) => {
  try {
    const invitation = await invitationService.updateOne(
      { _id: req.body.id },
      {
        state: 'accepted',
        // user: req.user.id
      },
      req.body.role
    );
    res.status(200).json({ data: invitation });
  } catch (e) {
    console.log(e);
    res.status(400).end();
  }
};

const rejectInvitation = async (req, res) => {
  try {
    const invitation = await invitationService.updateOne(
      { _id: req.body.id },
      {
        state: 'rejected',
        // user: req.user.id
      },
      req.body.role
    );
    res.status(200).json({ data: invitation });
  } catch (e) {
    console.log(e);
    res.status(200).end();
  }
};

module.exports = {
  acceptInvitation,
  rejectInvitation
};
