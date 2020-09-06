const parentService = require('./parentService');
const Product = require('../models/Product');

module.exports = parentService(Product);
