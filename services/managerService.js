const Manager = require('../models/Manager');
const parentService = require('./parentService');

const deleteDriver = async (managerId, driverId) => {
  const manager = await parentService(Manager).updateOne(
    { _id: managerId }, { $pullAll: { drivers: [driverId] } }
  );
  if (!manager) Promise.reject(new Error('Error occured'));
  return Promise.resolve(manager);
};

const getAllDrivers = async (managerId) => {
  try {
    const drivers = await parentService(Manager).getPopulate({ _id: managerId }, 'drivers');
    return Promise.resolve(drivers);
  } catch (e) {
    Promise.reject(e);
  }
};

module.exports = { ...parentService(Manager), deleteDriver, getAllDrivers };
