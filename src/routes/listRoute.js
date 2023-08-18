const express = require('express');
const ListController = require('../controllers/listController');

const router = express.Router();
const listController = new ListController();

router.post('/lists', listController.createList);
router.get('/getLists', listController.getAllActiveLists);
router.get('/lists/:listId', listController.getListById);
router.delete('/deleteLists/:listId', listController.deleteListById);

module.exports = router;
