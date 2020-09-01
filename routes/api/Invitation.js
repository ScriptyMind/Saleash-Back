const { Router, json } = require('express');
const Invitation = require('../../models/Invitation');
const invitationController = require('../../controllers/invitationController');

const router = Router();

router.get('/', invitationController.createOne);

router.get('/getone', async (req, res) => {
  try {
    const rec = await Invitation.findById('5f4e4fc768cf2009e5237e73').exec();
    res.status(200).json({ data: rec });
  } catch (e) {
    console.log(e);
    res.end();
  }
});

module.exports = router;
