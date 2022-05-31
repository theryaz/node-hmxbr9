const mongoose = require('mongoose');
const { MONGO_URL } = require('../config');

export async function connect() {
  await mongoose.connect(MONGO_URL);
}
