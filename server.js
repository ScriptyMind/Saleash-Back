const express = require('express');
const connect = require('./db/connect');
require('dotenv').config();

const app = express();

app.get('/', (req, res) => {
  res.status(200).send('HELLO WORLD');
});

const start = async () => {
  try {
    await connect();
    app.listen(process.env.PORT, () => {
      console.log("Server is ON");
    });
  } catch (e) {
    console.log(e);
  }
};

start();
