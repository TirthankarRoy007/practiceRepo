const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport')
const UserService = require('../services/userService');
const userValidationSchema = require('../lib/api-params-validation-schema/userValidation');
const { SECRET_KEY } = require('../lib/config/config');
const MESSAGES = require('../utils/messages');
const SYSTEM_ROLES = require('../utils/constants')
const nodemailer = require('nodemailer');
const RESET_PASSWORD_URL = 'http://localhost:3000/reset';

const userService = new UserService();

class UserController {
  async loginUser(req, res, next) {
    try {
      const { email, password } = req.body;
  
      passport.authenticate("local", (err, user, info) => {
        if (err) {
          return next(err);
        }
        if (!user) {
          return res.status(401).json({ message: info.message });
        }
  
        req.login(user, (loginErr) => {
          if (loginErr) {
            return next(loginErr);
          }
  
          const token = jwt.sign(
            { userId: user._id, email: user.email, role: user.role },
            SECRET_KEY,
            { expiresIn: '1h' }
          );
  
          res.json({ token });
        });
      })(req, res, next);
    } catch (err) {
      next(err);
    }
  }

  async createUser(req, res, next) {
    try {
        const { name, email, password } = req.body;

        const { error } = userValidationSchema.validate({ name, email, password });
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        
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
  
      const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
          user: 'valentina.smitham43@ethereal.email',
          pass: 'Rg62Mh6sHJ5unfWvFQ'
        }
      });
  
      const mailOptions = {
        from: 'rtirtha97@gmail.com',
        to: user.email,
        subject: 'Password Reset Request',
        text: `Click on the following link to reset your password: ${RESET_PASSWORD_URL}/${resetToken}`,
      };
  
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
          return res.status(500).json({ message: MESSAGES.EMAIL_ERROR });
        }
        console.log('Email sent:', info.response);
        res.json({ message: MESSAGES.RESET_EMAIL_SENT});
      });
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