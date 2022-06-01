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

  async findByEmail({ email }) {
    return await this.User.findOne({ email });
  }

  async getUnreadNotificationsByEmail({ email }) {
    const user = await this.findByEmail({ email });
    if (user === null) {
      throw new UserNotFoundError();
    }
    return this.getUnreadNotificationsByUserId({ userId: user.id });
  }

  async getUnreadNotificationsByUserId({ userId }) {
    return this.notificationService.countUnreadByUserId({ userId });
  }
}

module.exports = { UserService };
