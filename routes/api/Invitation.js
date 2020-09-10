const { Router } = require('express');
const invitationController = require('../../controllers/invitationController');
const managerController = require('../../controllers/managerController');

const invitationRouter = Router();

invitationRouter.post('/', managerController.createInvitation);

invitationRouter.put('/', invitationController.acceptInvitation);

invitationRouter.delete('/', managerController.deleteInvitation);

module.exports = invitationRouter;
