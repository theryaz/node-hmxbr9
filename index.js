/**
 * Read the README.md first
 * Run node index.js to start server
 */
const express = require('express');
const app = express();
const port = 3000;
const errorHandler = require('./common/errorHandler.js');
const { connect } = require('./common/mongodb/connect.js');
connect();

const { Notification } = require('./notification/notificationService.js');
const {
  NotificationService,
} = require('./notification/notificationService.js');
const { User } = require('./user/user.js');
const { UserService } = require('./user/userService.js');

const notificationService = new NotificationService(Notification);
const userService = new UserService(User, notificationService);

app.get('/', async (req, res) => {
  const user = await userService.findByEmail({
    email: 'ryan.lawson@gmail.co',
  });
  console.log('user', user);
  res.json(user);
});

// All requests go through the error handler before completing
app.use(errorHandler);

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
