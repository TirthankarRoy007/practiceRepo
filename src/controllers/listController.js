const ListService = require('../services/listService');
const MESSAGES = require('../utils/messages');
const listValidationSchema = require('../lib/api-params-validation-schema/listValidation');
const validateRequest = require('../middlewares/validateRequest');

const listService = new ListService();

class ListController {
  async createList(req, res, next) {
    try {
      // Validate the request body against the schema
      const validatedData = validateRequest(req.body, listValidationSchema);

      const { task } = validatedData;
      const newList = await listService.createList(task);
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
