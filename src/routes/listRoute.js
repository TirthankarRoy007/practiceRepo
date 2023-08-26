const express = require('express');
const ListController = require('../controllers/listController');
const { authenticateUser, authorizeAdmin } = require('../middlewares/authentication');
const apiParamsValidator = require('../middlewares/apiParamsValidator');
const { listSchema } = require('../lib/api-params-validation-schema/listValidation')

const router = express.Router();
const listController = new ListController();

router.post('/lists/:boardId', apiParamsValidator.middleware({schema: listSchema}), authenticateUser, authorizeAdmin, listController.createList);
router.get('/getLists', authenticateUser, authorizeAdmin, listController.getAllActiveLists);
router.get('/lists/:listId', authenticateUser, authorizeAdmin, listController.getListById);
router.delete('/deleteLists/:listId', authenticateUser, authorizeAdmin, listController.deleteListById);
module.exports = router;
