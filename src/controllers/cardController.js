const CardService = require('../services/cardService');
const MESSAGES = require('../utils/messages');

const cardService = new CardService();

class CardController {
  async createCard(req, res, next) {
    try {
      const { name, description, assigned_user } = req.body;
      const card = await cardService.createCard(name, description, assigned_user);
      res.json({ card });
    } catch (err) {
      next(err);
    }
  }

  async updateCardById(req, res, next) {
    try {
      const cardId = req.params.cardId;
      const { name, description, assigned_user } = req.body;
      
      const updatedCard = await cardService.updateCardById(cardId, {
        name, description, assigned_user
      });

      if (!updatedCard) {
        return res.status(404).json({ message: MESSAGES.CARD_NOT_EXISTS });
      }

      res.json({ card: updatedCard });
    } catch (err) {
      next(err);
    }
  }

  async getAllActiveCards(req, res, next) {
    try {
      const activeCards = await cardService.getAllActiveCards();
      res.json({ cards: activeCards });
    } catch (err) {
      next(err);
    }
  }

  async getCardById(req, res, next) {
    try {
      const cardId = req.params.cardId;
      const card = await cardService.getCardById(cardId);

      if (!card) {
        return res.status(404).json({ message: MESSAGES.CARD_NOT_EXISTS });
      }

      res.json({ card });
    } catch (err) {
      next(err);
    }
  }

  async deleteCardById(req, res, next) {
    try {
      const cardId = req.params.cardId;
      const deletedCard = await cardService.deleteCardById(cardId);

      if (!deletedCard) {
        return res.status(404).json({ message: MESSAGES.CARD_NOT_EXISTS });
      }

      res.json({ message: MESSAGES.CARD_DELETED });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = CardController;