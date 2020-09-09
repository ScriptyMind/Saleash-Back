const { Router } = require('express');
const managerController = require('../../controllers/managerController');

const route = Router();

route.post('/createInvitation', managerController.createInvitation);
route.delete('/deleteDriver', managerController.deleteDriver);

module.exports = route;
