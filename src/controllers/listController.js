const ListService = require('../services/listService');
const BoardService = require('../services/boardService')
const MESSAGES = require('../utils/messages');
const { BadRequestParameterError } = require('../lib/errors');

const listService = new ListService();
const boardService = new BoardService();

class ListController {
  async createList(req, res, next) {
    try {
      const boardId = req.params.boardId;

      const board = await boardService.getBoardById(boardId);

      if (!board) {
        throw new BadRequestParameterError(MESSAGES.BOARD_NOT_EXISTS);
      }
      const task = req.body.task;

      const newList = await listService.createList(task);
      board.lists.push(newList._id);
      await board.save();

      res.json({ list: newList });
    } catch (err) {
      next(err);
    }
  }

  async getAllActiveLists(req, res, next) {
    try {
      const activeLists = await listService.getAllActiveLists();
      res.json({ lists: activeLists });
    } catch (err) {
      next(err);
    }
  }

  async getListById(req, res, next) {
    try {
      const listId = req.params.listId;
      const list = await listService.getListById(listId);
      
      if (!list) {
        return res.status(404).json({ message: MESSAGES.LIST_NOT_EXISTS });
      }

      res.json({ list });
    } catch (err) {
      next(err);
    }
  }

  async deleteListById(req, res, next) {
    try {
      const listId = req.params.listId;
      const deletedList = await listService.deleteListById(listId);
      
      if (!deletedList) {
        return res.status(404).json({ message: MESSAGES.LIST_NOT_EXISTS });
      }

      res.json({ message: MESSAGES.LIST_DELETED });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = ListController;
