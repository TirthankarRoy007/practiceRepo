const Board = require('../models/board');
const MESSAGES = require('../utils/messages');

class BoardService {
  async createBoard(boardData) {
    try {
      const newBoard = await Board.create(boardData);
      return newBoard;
    } catch (err) {
      throw err;
    }
  }

  async getAllBoards() {
    try {
      const activeBoards = await Board.find({ isDeleted: false });
      return activeBoards;
    } catch (err) {
      throw err;
    }
  }

  async getBoardById(boardId) {
    try {
      const board = await Board.findById(boardId);
      if (!board) {
        throw new Error(MESSAGES.BOARD_NOT_EXISTS);
      }
      return board;
    } catch (err) {
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
        throw new Error(MESSAGES.BOARD_NOT_EXISTS);
      }
      
      return deletedBoard;
    } catch (err) {
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
        throw new Error(MESSAGES.BOARD_NOT_EXISTS);
      }
      
      return updatedBoard;
    } catch (err) {
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
        throw new Error(MESSAGES.BOARD_NOT_EXISTS);
      }
      
      return updatedBoard;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = BoardService;
