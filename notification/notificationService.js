class NotificationService {
  constructor(Notification) {
    this.Notification = Notification;
  }

  async create({ userId, message }) {
    return await this.Notification.create({ userId, message });
  }

  async countUnreadByUserId({ userId }){
    const unreadCount = await this.Notification.count({ userId, read: false });
    return { unreadCount };
  }
}

module.exports = { NotificationService };
