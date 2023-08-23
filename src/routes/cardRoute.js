const express = require('express');
const CardController = require('../controllers/cardController');
const { authenticateUser } = require('../middlewares/authMiddleware');

const router = express.Router();
const cardController = new CardController();

router.post('/cards', authenticateUser, cardController.createCard);
router.get('/getCards', authenticateUser, cardController.getAllActiveCards);
router.get('/getCards/:cardId', authenticateUser, cardController.getCardById);
router.put('/updateCards/:cardId', authenticateUser, cardController.updateCardById);
router.delete('/deleteCards/:cardId', authenticateUser, cardController.deleteCardById);

module.exports = router;
