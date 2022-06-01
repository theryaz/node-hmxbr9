const { UserNotFoundError } = require('../common/error/UserNotFoundError');
class UserService {
  constructor(User, notificationService) {
    this.User = User;
    this.notificationService = notificationService;
  }

  async create({ email }) {
    return await this.User.create({ email });
  }

  async pushNotification({ email, message }) {
    const user = await this.findByEmail({ email });
    if(user === null){
      throw new UserNotFoundError();
    }
    return await this.notificationService.create({ userId: user._id, message });
  }

  async findById({ _id }) {
    const user = await this.User.findOne({ _id });
    if (user === null) {
      throw new UserNotFoundError();
    }
    return user;
  }

  async findByEmail({ email }) {
    const user = await this.User.findOne({ email });
    if (user === null) {
      throw new UserNotFoundError();
    }
    return user;
  }

  async getUnreadNotificationsByEmail({ email }) {
    const user = await this.findByEmail({ email });
    return this.getUnreadNotificationsByUserId({ userId: user.id });
  }

  async getUnreadNotificationsByUserId({ userId }) {
    // Verifies this user exists when looking up by id.
    // This would normally happen during authentication.
    await this.findById({ _id: userId });
    return this.notificationService.countUnreadByUserId({ userId });
  }

  async markNotificationsReadByEmail({ email }) {
    const user = await this.findByEmail({ email });
    return this.notificationService.markAllReadByUserId({ userId: user._id });
  }
}

module.exports = { UserService };
