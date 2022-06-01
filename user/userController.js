const { Router } = require('express');
const { BadRequestError } = require('../common/error/BadRequestError');

class UserController {
  constructor(userService) {
    this.userService = userService;
  }

	createRouter(){
		const router = Router();
		router.post('/', this.createUser.bind(this));
		router.post('/notification', this.createNotification.bind(this));
		router.get('/notification/unread', this.getUnreadNotifications.bind(this));
		router.put('/notification/mark-read', this.markAllNotificationsRead.bind(this));
		return router;
	}

	/**
	 * Creates a new user with given email address. Returns existing user if email is already present
	 */
  async createUser(req, res, next) {
		try{
			const { email: userEmail } = req.body;
			if(!userEmail) throw new BadRequestError();
			let user = await this.userService.create({ email: userEmail }).catch(e => {
				// Handle duplicate key error, email is in use
				if(e.code === 11000) return null;
				throw e;
			});
			if(user === null){
				user = await this.userService.findByEmail({ email: userEmail });
			}
			const { email, _id } = user;
			res.json({ email, _id });
		}catch(e){
			return next(e);
		}
  }
	/**
	 * Creates a new unread notification for the given user
	 */
  async createNotification(req, res, next) {
		try{
			const { email, message: reqMessage } = req.body;
			const notification = await this.userService.pushNotification({ email, message: reqMessage });
			const { userId, read, message, _id } = notification;
			res.json({ userId, read, message, _id });
		}catch(e){
			return next(e);
		}
  }

	/**
	 * Returns `unreadCount` for the given user by email address or id
	 */
  async getUnreadNotifications(req, res, next) {
		try{
			const { email, _id } = req.query;
			let unreadPromise;
			if(email){
				unreadPromise = this.userService.getUnreadNotificationsByEmail({email});
			}else if(_id){
				unreadPromise = this.userService.getUnreadNotificationsByUserId({userId: _id});
			}else{
				throw new BadRequestError("Must provide email or _id for user");
			}
			const { unreadCount } = await unreadPromise;
			res.json({ unreadCount });
		}catch(e){
			return next(e);
		}
  }

	/**
	 * Marks all notifications as read for the given user by email address. Returns number of notifications modified.
	 */
  async markAllNotificationsRead(req, res, next) {
		try{
			const { email } = req.body;
			if(!email){
				throw new BadRequestError("Must provide email for user");
			}
			const result = await this.userService.markNotificationsReadByEmail({ email });
			res.json(result);
		}catch(e){
			return next(e);
		}
  }
}

module.exports = { UserController };
