const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const authRouter = require('./routes/api/Auth');

require('dotenv/config');

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

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server up and running on port ${port} !`));
