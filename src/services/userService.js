const User = require('../models/user');

class UserService {
  async createUser(userData) {
    try {
      if (userData.email) {
        const existingUser = await User.findOne({
          email: userData.email,
        });

        if (existingUser) {
          throw new Error('User with this email already exists');
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
        throw new Error('User not found');
      }
      return user;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = UserService;