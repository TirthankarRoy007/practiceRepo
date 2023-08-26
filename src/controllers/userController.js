const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/user')
const UserService = require('../services/userService');
const { SECRET_KEY } = require('../lib/config/config');
const MESSAGES = require('../utils/messages');
const SYSTEM_ROLES = require('../utils/constants')
const sendEmail = require('../lib/mailer/emailService')
const {BadRequestParameterError, BadRequestDataTypeError } = require('../lib/errors')

const userService = new UserService();

class UserController {
  async loginUser(req, res, next) {
    try {
      const { email, password } = req.body;
  
      let verifyUser = await UserModel.findOne({ email: email });
      if (!verifyUser) {
        throw new BadRequestParameterError(MESSAGES.INVALID_LOGIN_CREDENTIAL);
      }
  
      let isMatch = await bcrypt.compare(password, verifyUser.password);
      if (!isMatch) {
        throw new BadRequestParameterError(MESSAGES.INVALID_LOGIN_CREDENTIAL);
      }
  
      const token = jwt.sign(
        { userId: verifyUser._id, email: verifyUser.email, role: verifyUser.role },
        SECRET_KEY,
        { expiresIn: '1h' }
      );
  
      res.json({ token });
    } catch (error) {
      next(new BadRequestDataTypeError(error.message));
    }
  };  

  async createUser(req, res, next) {
    try {
        const { name, email, password } = req.body;

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const role = SYSTEM_ROLES.GUEST;

        const user = await userService.createUser({
            name: name,
            email: email,
            password: hashedPassword,
            role: role
        });

        res.json({ user });
    } catch (err) {
        next(err);
    }
  }

  async getAllUsers(req, res, next) {
    try {
      const users = await userService.getAllUsers();
      res.json({ users });
    } catch (err) {
      next(err);
    }
  }

  async getUserById(req, res, next) {
    try {
      const userId = req.params.userId;
      const user = await userService.getUserById(userId);
      res.json({ user });
    } catch (err) {
      next(err);
    }
  }

  async forgotPassword(req, res, next) {
    try {
      const { email } = req.body;
      const user = await userService.getUserByEmail(email);
      if (!user) {
        return res.status(404).json({ message: MESSAGES.USER_NOT_FOUND });
      }
      const resetToken = await userService.generatePasswordResetToken(email);

      try {
        await sendEmail(user.email, resetToken);
        res.json({ message: MESSAGES.RESET_EMAIL_SENT });
      } catch (error) {
        return res.status(500).json({ message: error });
      }
    } catch (err) {
      next(err);
    }
  }

  async resetPassword(req, res, next) {
    try {
      const { email, newPassword } = req.body;
  
      const message = await userService.resetPassword(email, newPassword);
  
      res.json({ message: message });
    } catch (err) {
      next(err);
    }
  }  
}

module.exports = UserController;