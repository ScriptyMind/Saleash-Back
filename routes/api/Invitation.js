const { Router } = require('express');
const invitationController = require('../../controllers/invitationController');

const router = Router();

router.get('/', invitationController.createOne);

module.exports = router;
