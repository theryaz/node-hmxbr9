const { model, Schema } = require('mongoose');

const NotificationSchema = new Schema({
  userId: String,
  read: {
    type: Boolean,
    default: false,
  },
});

const Notification = model('Notification', NotificationSchema);

module.exports = {
  Notification,
};
