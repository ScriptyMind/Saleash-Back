const { Mongoose } = require("mongoose");

const Client = require('../models/Client');
const parentService = require('./parentService');

module.exports = parentService(Client);
