const express = require('express');
const UserController = require('../controllers/userController');
const { authenticateUser, authorizeAdmin } = require('../middlewares/authMiddleware');

const router = express.Router();
const userController = new UserController();

router.post('/login', userController.loginUser);
router.post('/users', userController.createUser);
router.get('/getAllUsers', authenticateUser, authorizeAdmin, userController.getAllUsers);
router.get('/getUserById/:userId', authenticateUser, userController.getUserById )
router.post('/forgot', userController.forgotPassword);
router.post('/reset', userController.resetPassword);

module.exports = router;
