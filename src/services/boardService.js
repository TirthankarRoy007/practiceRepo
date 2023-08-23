const Board = require('../models/board');
const logger = require('../lib/logger/logger');
const MESSAGES = require('../utils/messages');

class BoardService {
  async createBoard(boardData) {
    try {
      const newBoard = await Board.create(boardData);
      logger.info(`Board created: Name - ${newBoard.name}, ID - ${newBoard._id}`);
      return newBoard;
    } catch (err) {
      logger.error('Error creating board:', err);
      throw err;
    }
  }

  async getAllBoards() {
    try {
      const activeBoards = await Board.find({ isDeleted: false });
      return activeBoards;
    } catch (err) {
      logger.error('Error fetching all boards:', err);
      throw err;
    }
  }

  async getBoardById(boardId) {
    try {
      const board = await Board.findById(boardId);
      if (!board) {
        logger.warn(`Board not found for ID: ${boardId}`);
        throw new Error(MESSAGES.BOARD_NOT_EXISTS);
      }
      return board;
    } catch (err) {
      logger.error('Error fetching board by ID:', err);
      throw err;
    }
  }

  async deleteBoardById(boardId) {
    try {
      const deletedBoard = await Board.findByIdAndUpdate(
        boardId,
        { isDeleted: true },
        { new: true }
      );

      if (!deletedBoard) {
        logger.warn(`Board not found for deletion, ID: ${boardId}`);
        throw new Error(MESSAGES.BOARD_NOT_EXISTS);
      }

      logger.info(`Board deleted: Name - ${deletedBoard.name}, ID - ${deletedBoard._id}`);
      return deletedBoard;
    } catch (err) {
      logger.error('Error deleting board:', err);
      throw err;
    }
  }

  async addMemberToBoard(boardId, member) {
    try {
      const updatedBoard = await Board.findByIdAndUpdate(
        boardId,
        { $push: { members: member } },
        { new: true }
      );

      if (!updatedBoard) {
        logger.warn(`Board not found for adding member, ID: ${boardId}`);
        throw new Error(MESSAGES.BOARD_NOT_EXISTS);
      }

      logger.info(`Member added to board - Board ID: ${boardId}, Member: ${member}`);
      return updatedBoard;
    } catch (err) {
      logger.error('Error adding member to board:', err);
      throw err;
    }
  }

  async removeMemberFromBoard(boardId, member) {
    try {
      const updatedBoard = await Board.findByIdAndUpdate(
        boardId,
        { $pull: { members: member } },
        { new: true }
      );

      if (!updatedBoard) {
        logger.warn(`Board not found for removing member, ID: ${boardId}`);
        throw new Error(MESSAGES.BOARD_NOT_EXISTS);
      }

      logger.info(`Member removed from board - Board ID: ${boardId}, Member: ${member}`);
      return updatedBoard;
    } catch (err) {
      logger.error('Error removing member from board:', err);
      throw err;
    }
  }
}

module.exports = BoardService;