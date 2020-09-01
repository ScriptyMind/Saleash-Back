const { Router, json } = require('express');
const Invitation = require('../../models/Invitation');
const invitationController = require('../../controllers/invitationController');

const router = Router();

// router.get('/', invitationController.createOne);

// router.get('/getone', async (req, res) => {
//   try {
//     const rec = await Invitation.findOne({ company: 'taha' }).exec();
//     res.status(200).json({ data: rec });
//   } catch (e) {
//     console.log(e);
//     res.end();
//   }
// });

module.exports = router;
