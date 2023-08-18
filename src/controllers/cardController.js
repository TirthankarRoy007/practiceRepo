const CardService = require('../services/cardService');

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
        return res.status(404).json({ message: 'Card not found' });
      }

      res.json({ card });
    } catch (err) {
      next(err);
    }
  }

  async updateCardById(req, res, next) {
    try {
      const cardId = req.params.cardId;
      const updatedCard = await cardService.updateCardById(cardId, req.body);
      
      if (!updatedCard) {
        return res.status(404).json({ message: 'Card not found' });
      }

      res.json({ card: updatedCard });
    } catch (err) {
      next(err);
    }
  }

  async deleteCardById(req, res, next) {
    try {
      const cardId = req.params.cardId;
      const deletedCard = await cardService.deleteCardById(cardId);
      
      if (!deletedCard) {
        return res.status(404).json({ message: 'Card not found' });
      }

      res.json({ message: 'Card deleted' });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = CardController;
