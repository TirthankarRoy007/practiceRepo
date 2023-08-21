const BoardService = require('../services/boardService');
const MESSAGES = require('../utils/messages');
const boardValidationSchema = require('../lib/api-params-validation-schema/boardValidation');
const validateRequest = require('../middlewares/validateRequest');

const boardService = new BoardService();

class BoardController {
  async createBoard(req, res, next) {
    try {
      const validatedData = validateRequest(req.body, boardValidationSchema);

      const { name, members } = validatedData;
      const board = await boardService.createBoard({ name, members });
      res.json({ board });
    } catch (err) {
      next(err);
    }
  }

  async getAllBoards(req, res, next) {
    try {
      const activeBoards = await boardService.getAllBoards();
      res.json({ boards: activeBoards });
    } catch (err) {
      next(err);
    }
  }

  async getBoardById(req, res, next) {
    try {
      const boardId = req.params.boardId;
      const board = await boardService.getBoardById(boardId);
      res.json({ board });
    } catch (err) {
      next(err);
    }
  }

  async deleteBoardById(req, res, next) {
    try {
      const boardId = req.params.boardId;
      await boardService.deleteBoardById(boardId);
      res.json({ message: MESSAGES.BOARD_DELETED });
    } catch (err) {
      next(err);
    }
  }

  async addMemberToBoard(req, res, next) {
    try {
      const boardId = req.params.boardId;

      const validatedData = validateRequest(req.body, boardValidationSchema);

      const { member } = validatedData;
      const updatedBoard = await boardService.addMemberToBoard(boardId, member);
      res.json({ board: updatedBoard });
    } catch (err) {
      next(err);
    }
  }

  async removeMemberFromBoard(req, res, next) {
    try {
      const boardId = req.params.boardId;

      const validatedData = validateRequest(req.body, boardValidationSchema);

      const { member } = validatedData;
      const updatedBoard = await boardService.removeMemberFromBoard(boardId, member);
      res.json({ board: updatedBoard });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = BoardController;