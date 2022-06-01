const { model, Schema } = require('mongoose');

const NotificationSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    default: null,
    index: true,
  },
  read: {
    type: Boolean,
    default: false,
  },
  message: {
    type: String,
  },
});

const Notification = model('Notification', NotificationSchema);

module.exports = {
  Notification,
};
