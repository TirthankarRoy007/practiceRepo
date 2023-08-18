const express = require('express');
const BoardController = require('../controllers/boardController');

const router = express.Router();
const boardController = new BoardController();

router.post('/boards', boardController.createBoard);
router.get('/getAllBoards', boardController.getAllBoards);
router.get('/boards/:boardId', boardController.getBoardById);
router.delete('/boards/:boardId', boardController.deleteBoardById);
router.post('/addMember/:boardId', boardController.addMemberToBoard);
router.post('/removeMember/:boardId', boardController.removeMemberFromBoard);

module.exports = router;
