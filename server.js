const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.status(200).send('HELLO WORLD');
});

app.listen(5000, () => {
  // eslint-disable-next-line no-console
  console.log('Server IS ON');
});