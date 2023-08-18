const List = require('../models/list');

class ListService {
  async createList(task) {
    try {
      const newList = await List.create({ task });
      return newList;
    } catch (err) {
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
      throw err;
    }
  }

  async getAllActiveLists() {
    try {
      const activeLists = await List.find({ isDeleted: false });
      return activeLists;
    } catch (err) {
      throw err;
    }
  }

  async getListById(listId) {
    try {
      const list = await List.findById(listId);
      return list;
    } catch (err) {
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

      return updatedList;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = ListService;