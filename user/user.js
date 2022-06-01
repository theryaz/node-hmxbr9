const { model, Schema } = require('mongoose');

const UserSchema = new Schema({
  email: {
    type: String,
    index: true,
    unique: true,
  },
});

const User = model('User', UserSchema);

module.exports = {
  User,
};
