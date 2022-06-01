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

const { Notification } = require('./notification/notification.js');
const {
  NotificationService,
} = require('./notification/notificationService.js');
const { User } = require('./user/user.js');
const { UserService } = require('./user/userService.js');
const { UserController } = require('./user/userController.js');

const notificationService = new NotificationService(Notification);
const userService = new UserService(User, notificationService);
const userController = new UserController(userService);

app.use(express.json());
app.use((req,_res,next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});
app.use('/user', userController.createRouter());

// All requests go through the error handler before completing
app.use(errorHandler);

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
