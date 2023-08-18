const express = require('express');
const CardController = require('../controllers/cardController');

const router = express.Router();
const cardController = new CardController();

router.post('/cards', cardController.createCard);
router.get('/getCards', cardController.getAllActiveCards);
router.get('/getCards/:cardId', cardController.getCardById);
router.put('/updateCards/:cardId', cardController.updateCardById);
router.delete('/deleteCards/:cardId', cardController.deleteCardById);

module.exports = router;
