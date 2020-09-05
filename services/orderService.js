const Order = require('../models/Order');
const parentService = require('./parentService');

module.exports = parentService(Order);
