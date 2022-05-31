import { model, Schema } from 'mongoose';

const UserSchema = new Schema({
  email: String,
});

const User = model('User', UserSchema);

module.exports = {
  User,
};
