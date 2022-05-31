const mongoose = require('mongoose');
const { MONGO_URL } = require('../config');

async function connect() {
  console.log('Connecting to MongoDB', MONGO_URL);
  await mongoose.connect(MONGO_URL, { dbName: 'test', useNewUrlParser: true });
  console.log('MongoDB Connected!');
}

module.exports = { connect };
