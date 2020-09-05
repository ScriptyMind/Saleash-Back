const Order = require('../models/Order');

const createOne = async (req, res) => {
  try {
    const newOrder = {
      deliveryDate: req.body.deliveryDate,
      price: req.body.price,
      manager: req.user.id,
      driver: req.body.driver,
      agent: req.body.agent,
      client: req.body.client,
      product: req.body.product,
    };
    const createdOrder = await Order.create(newOrder);
    res.status(200).json({ data: createdOrder });
  } catch (e) {
    console.log(e);
    res.status(400).end();
  }
};

const deleteOne = async (req, res) => {
  try {
    const deleted = await Order.findByIdAndRemove(req.body.id);
    res.status(200).json({ data: deleted });
  } catch (e) {
    console.log(e);
    res.status(400).end();
  }
};

const updateOne = async (req, res) => {
  try {
    const updated = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ data: updated });
  } catch (e) {
    console.log(e);
    res.status(400).end();
  }
};

module.exports = {
  createOne,
  deleteOne,
  updateOne
};
