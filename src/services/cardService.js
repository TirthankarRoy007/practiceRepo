const Card = require('../models/card');
const logger = require('../lib/logger/logger');
const MESSAGES = require('../utils/messages');
const { NoRecordFoundError } = require('../lib/errors')

class CardService {
  async createCard(name, description, assigned_user) {
    try {
      const newCard = await Card.create({
        name,
        description,
        assigned_user
      });

      logger.info(`Card created: Name - ${newCard.name}, ID - ${newCard._id}`);
      return newCard;
    } catch (err) {
      logger.error('Error creating card:', err);
      throw err;
    }
  }

  async getAllActiveCards() {
    try {
      const activeCards = await Card.find({ isDeleted: false });
      if(!activeCards){
        throw new NoRecordFoundError(MESSAGES.CARD_NOT_EXISTS)
      }
      return activeCards;
    } catch (err) {
      logger.error('Error fetching all active cards:', err);
      throw err;
    }
  }

  async getCardById(cardId) {
    try {
      const card = await Card.findById(cardId);
      if(!card){
        throw new NoRecordFoundError(MESSAGES.CARD_NOT_EXISTS)
      }
      return card;
    } catch (err) {
      logger.error('Error fetching card by ID:', err);
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
      if(updatedCard){
        throw new NoRecordFoundError(MESSAGES.CARD_NOT_EXISTS)
      }

      logger.info(`Card updated: Name - ${updatedCard.name}, ID - ${updatedCard._id}`);
      return updatedCard;
    } catch (err) {
      logger.error('Error updating card:', err);
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

      logger.info(`Card deleted: Name - ${updatedCard.name}, ID - ${updatedCard._id}`);
      return updatedCard;
    } catch (err) {
      logger.error('Error deleting card:', err);
      throw err;
    }
  }
}

module.exports = CardService;
