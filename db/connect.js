const mongoose = require('mongoose');
require('dotenv').config();

const connect = () => mongoose.connect(process.env.DBURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connect;
