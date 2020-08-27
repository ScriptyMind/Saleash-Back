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

// Connect to MongoDB
mongoose
  .connect(
    process.env.DB_CONNECTION,
    { useNewUrlParser: true, useUnifiedTopology: true },
  )
  .then(() => console.log('MongoDB successfully connected'))
  .catch((err) => console.log(err));

app.use('/api/user', authRouter);

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
