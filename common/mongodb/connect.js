const mongoose = require('mongoose');
const { MONGO_URL } = require('../config');

async function connect() {
  await mongoose.connect(MONGO_URL);
}

module.exports = { connect };
