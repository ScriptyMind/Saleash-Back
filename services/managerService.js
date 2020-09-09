const Manager = require('../models/Manager');
const parentService = require('./parentService');

const deleteDriver = async (managerId, driverId) => {
  const manager = await parentService(Manager).updateOne(
    { _id: managerId }, { $pullAll: { drivers: [driverId] } }
  );
  if (!manager) Promise.reject(new Error('Error occured'));
  Promise.resolve(manager);
};

module.exports = { ...parentService(Manager), deleteDriver };
