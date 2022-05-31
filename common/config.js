const dotenv = require('dotenv');

dotenv.config();

const config = {
  MONGO_URL: process.env.MONGO_URL,
};
module.exports = config;
