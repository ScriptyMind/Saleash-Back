const Manager = require('../models/Manager');
const parentService = require('./parentService');

module.exports = parentService(Manager);
