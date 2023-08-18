const UserService = require('../services/UserService');

const userService = new UserService();

class UserController {
  async createUser(req, res, next) {
    try {
      const { name, email } = req.body;
      const user = await userService.createUser({ name, email });
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