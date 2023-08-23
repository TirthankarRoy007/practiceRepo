const express = require('express');
const BoardController = require('../controllers/boardController');
const { authenticateUser, authorizeAdmin } = require('../middlewares/authMiddleware');

const router = express.Router();
const boardController = new BoardController();

router.post('/boards', authenticateUser, boardController.createBoard);
router.get('/getAllBoards', authenticateUser, boardController.getAllBoards);
router.get('/boards/:boardId', authenticateUser, boardController.getBoardById);
router.delete('/boards/:boardId', authenticateUser, boardController.deleteBoardById);
router.post('/addMember/:boardId', authenticateUser, authorizeAdmin, boardController.addMemberToBoard);
router.post('/removeMember/:boardId', authenticateUser, authorizeAdmin, boardController.removeMemberFromBoard);

module.exports = router;
