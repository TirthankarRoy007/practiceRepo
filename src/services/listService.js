const List = require('../models/list');
const logger = require('../lib/logger/logger');

class ListService {
  async createList(task) {
    try {
      const newList = await List.create({ task });
      logger.info(`List created: Task - ${newList.task}, ID - ${newList._id}`);
      return newList;
    } catch (err) {
      logger.error('Error creating list:', err);
      throw err;
    }
  }

  async addListToBoard(listId, boardId) {
    try {
      const updatedList = await List.findByIdAndUpdate(
        listId,
        { $push: { boards: boardId } },
        { new: true }
      );

      return updatedList;
    } catch (err) {
      logger.error('Error adding list to board:', err);
      throw err;
    }
  }

  async getAllActiveLists() {
    try {
      const activeLists = await List.find({ isDeleted: false });
      return activeLists;
    } catch (err) {
      logger.error('Error fetching all active lists:', err);
      throw err;
    }
  }

  async getListById(listId) {
    try {
      const list = await List.findById(listId);
      return list;
    } catch (err) {
      logger.error('Error fetching list by ID:', err);
      throw err;
    }
  }

  async deleteListById(listId) {
    try {
      const updatedList = await List.findByIdAndUpdate(
        listId,
        { isDeleted: true },
        { new: true }
      );

      logger.info(`List deleted: Task - ${updatedList.task}, ID - ${updatedList._id}`);
      return updatedList;
    } catch (err) {
      logger.error('Error deleting list:', err);
      throw err;
    }
  }
}

module.exports = ListService;
