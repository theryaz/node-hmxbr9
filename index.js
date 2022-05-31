/**
 * Read the README.md first
 * Run node index.js to start server
 */
const express = require('express');
const app = express();
const port = 3000;
const { connect } = require('./common/mongodb/connect.js');
connect();

app.get('/', (req, res) => {
  res.send('Hello!');
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
