class UserService {
  constructor(User, notificationService) {
    this.User = User;
    this.notificationService = notificationService;
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
    return this.notificationService.findUnreadByUserId({ userId });
  }
}

module.exports = { UserService };
