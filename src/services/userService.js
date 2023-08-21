const User = require('../models/user');
const MESSAGES = require('../utils/messages');

class UserService {
  async createUser(userData) {
    try {
    if (userData.email) {
      const existingUser = await User.findOne({
        email: userData.email,
      });

      if (existingUser) {
        throw new Error(MESSAGES.USER_ALREADY_EXISTS);
      }
    }

    const newUser = await User.create(userData);

    return newUser;
    } catch (err) {
    throw err;
    }
  }

  async getAllUsers() {
    try {
    const users = await User.find();
    return users;
    } catch (err) {
    throw err;
    }
  }

  async getUserById(userId) {
    try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error(MESSAGES.USER_NOT_EXISTS);
    }
    return user;
    } catch (err) {
    throw err;
    }
  }
}

module.exports = UserService;