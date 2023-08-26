const express = require('express');
const UserController = require('../controllers/userController');
const { authenticateUser, authorizeAdmin } = require('../middlewares/authentication');
const apiParamsValidator = require('../middlewares/apiParamsValidator')
const { loginUserSchema, createUserSchema, forgotPasswordSchema, resetPasswordSchema } = require('../lib/api-params-validation-schema/userValidation')

const router = express.Router();
const userController = new UserController();

router.post('/login', apiParamsValidator.middleware({schema: loginUserSchema}), userController.loginUser);
router.post('/users', apiParamsValidator.middleware({schema: createUserSchema}), userController.createUser);
router.get('/getAllUsers', authenticateUser, authorizeAdmin, userController.getAllUsers);
router.get('/getUserById/:userId', authenticateUser, authorizeAdmin, userController.getUserById )
router.post('/forgot', apiParamsValidator.middleware({schema: forgotPasswordSchema}), userController.forgotPassword);
router.post('/reset', apiParamsValidator.middleware({schema: resetPasswordSchema}), userController.resetPassword);

module.exports = router;
