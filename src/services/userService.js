const User = require('../models/user');
const logger = require('../lib/logger/logger');
const MESSAGES = require('../utils/messages');
const uuid = require('uuid');
const bcrypt = require('bcrypt');
const { NoRecordFoundError, ConflictError } = require('../lib/errors')

class UserService {
  async getUserByEmail(email) {
    return User.findOne({ email });
  }

  async createUser(userData) {
    try {
      if (userData.email) {
        const existingUser = await User.findOne({
          email: userData.email,
        });

        if (existingUser) {
          throw new ConflictError(MESSAGES.USER_ALREADY_EXISTS);
        }
      }

      const newUser = await User.create(userData);
      logger.info(`User created: ${newUser.name} (${newUser.email})`);
      
      return newUser;
    } catch (err) {
      logger.error('Error creating user:', err);
      throw err;
    }
  }

  async getAllUsers() {
    try {
      const users = await User.find();
      return users;
    } catch (err) {
      logger.error('Error fetching all users:', err);
      throw err;
    }
  }

  async getUserById(userId) {
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw new NoRecordFoundError(MESSAGES.USER_NOT_EXISTS);
      }
      logger.info(`User retrieved: ${user.name} (${user.email})`);
      return user;
    } catch (err) {
      logger.error('Error fetching user by ID:', err);
      throw err;
    }
  }

  async generatePasswordResetToken(email) {
    const user = await this.getUserByEmail(email);
    if (!user) {
      throw new NoRecordFoundError(MESSAGES.USER_NOT_EXISTS);
    }

    const resetToken = uuid.v4();
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000;

    await user.save();
    return resetToken;
  }

  async resetPassword(email, newPassword) {
    try {
      const user = await User.findOne({ email });
  
      if (!user) {
        throw new NoRecordFoundError(MESSAGESUSER_NOT_FOUND);
      }
  
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
  
      user.password = hashedPassword;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
  
      await user.save();
      return MESSAGES.PASSWORD_RESET_SUCCESS;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UserService;
