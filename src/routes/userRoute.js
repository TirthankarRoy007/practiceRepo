const express = require('express');
const UserController = require('../controllers/UserController');

const router = express.Router();
const userController = new UserController();

router.post('/users', userController.createUser);
router.get('/getAllUsers', userController.getAllUsers);
router.get('/getUserById/:userId', userController.getUserById )

module.exports = router;
