const Card = require('../models/card');

class CardService {
  async createCard(name, description, assigned_user) {
    try {
      const newCard = await Card.create({
        name,
        description,
        assigned_user
      });

      return newCard;
    } catch (err) {
      throw err;
    }
  }

  async getAllActiveCards() {
    try {
      const activeCards = await Card.find({ isDeleted: false });
      return activeCards;
    } catch (err) {
      throw err;
    }
  }

  async getCardById(cardId) {
    try {
      const card = await Card.findById(cardId);
      return card;
    } catch (err) {
      throw err;
    }
  }

  async updateCardById(cardId, updateData) {
    try {
      const updatedCard = await Card.findByIdAndUpdate(
        cardId,
        updateData,
        { new: true }
      );

      return updatedCard;
    } catch (err) {
      throw err;
    }
  }

  async deleteCardById(cardId) {
    try {
      const updatedCard = await Card.findByIdAndUpdate(
        cardId,
        { isDeleted: true },
        { new: true }
      );

      return updatedCard;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = CardService;
