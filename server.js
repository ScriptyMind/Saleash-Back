const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.status(200).send('HELLO WORLD');
});

app.listen(3000, () => {
  console.log('Server IS ON');
});
