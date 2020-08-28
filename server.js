const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const connect = require('./db/connect');
const authRouter = require('./routes/api/Auth');
require('dotenv').config();

const app = express();

// Bodyparser middleware
app.use(cookieParser());
app.use(express.json());
app.use(morgan('dev'));


app.use('/api/user', authRouter);

// connect to mongodb and start the server
const start = async () => {
  try {
    await connect();
    app.listen(process.env.PORT, () => {
      console.log('Server is ON');
    });
  } catch (e) {
    console.log(e);
  }
};

start();
