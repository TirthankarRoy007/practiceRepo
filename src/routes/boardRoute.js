const express = require('express');
const BoardController = require('../controllers/boardController');
const { authenticateUser, authorizeAdmin } = require('../middlewares/authentication');
const apiParamsValidator = require('../middlewares/apiParamsValidator')
const { createBoardSchema, memberSchema } = require('../lib/api-params-validation-schema/boardValidation')

const router = express.Router();
const boardController = new BoardController();

router.post('/boards', apiParamsValidator.middleware({schema: createBoardSchema}), authenticateUser,authorizeAdmin, boardController.createBoard);
router.get('/getAllBoards', authenticateUser, boardController.getAllBoards);
router.get('/boards/:boardId', authenticateUser, boardController.getBoardById);
router.delete('/boards/:boardId', authenticateUser, authorizeAdmin, boardController.deleteBoardById);
router.post('/addMember/:boardId', authenticateUser, authorizeAdmin, apiParamsValidator.middleware({schema: memberSchema}), boardController.addMemberToBoard);
router.post('/removeMember/:boardId', authenticateUser, authorizeAdmin, apiParamsValidator.middleware({schema: memberSchema}), boardController.removeMemberFromBoard);

module.exports = router;
