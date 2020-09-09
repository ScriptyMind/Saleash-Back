const connect = require('./db/connect');
const parentService = require('./services/parentService');
const User = require('./models/User');

const start = async () => {
  try {
    await connect();
    console.log("connected");
    const manager = await parentService(User).getAll();
    console.log(manager);
  } catch (e) {
    console.log(e);
  }
};

start();