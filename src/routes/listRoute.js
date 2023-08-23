const express = require('express');
const ListController = require('../controllers/listController');
const { authenticateUser } = require('../middlewares/authMiddleware');

const router = express.Router();
const listController = new ListController();

router.post('/lists', authenticateUser, listController.createList);
router.get('/getLists', authenticateUser, listController.getAllActiveLists);
router.get('/lists/:listId', authenticateUser, listController.getListById);
router.delete('/deleteLists/:listId', authenticateUser, listController.deleteListById);
module.exports = router;
