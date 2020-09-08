const Agent = require('../models/Agent');
const parentService = require('./parentService');

module.exports = parentService(Agent);
