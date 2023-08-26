const express = require('express');
const CardController = require('../controllers/cardController');
const { authenticateUser, authorizeAdmin } = require('../middlewares/authentication');
const apiParamsValidator = require('../middlewares/apiParamsValidator')
const { createCardSchema } = require('../lib/api-params-validation-schema/cardValidation')

const router = express.Router();
const cardController = new CardController();

router.post('/cards', authenticateUser, authorizeAdmin, apiParamsValidator.middleware({schema: createCardSchema}), cardController.createCard);
router.get('/getCards', authenticateUser, cardController.getAllActiveCards);
router.get('/getCards/:cardId', authenticateUser, cardController.getCardById);
router.put('/updateCards/:cardId', authenticateUser, authorizeAdmin, cardController.updateCardById);
router.delete('/deleteCards/:cardId', authenticateUser, authorizeAdmin, cardController.deleteCardById);

module.exports = router;
