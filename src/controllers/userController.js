const UserService = require('../services/UserService');
const userValidationSchema = require('../lib/api-params-validation-schema/userValidation');
const bycrypt = require('bcrypt');

const userService = new UserService();

class UserController {
  async createUser(req, res, next) {
    try {
        const { name, email, password } = req.body;

        const { error } = userValidationSchema.validate({ name, email, password });
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const user = await userService.createUser({
            name: name,
            email: email,
            password: hashedPassword
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
}

module.exports = UserController;