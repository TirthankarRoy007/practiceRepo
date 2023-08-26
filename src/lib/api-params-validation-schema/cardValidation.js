const Joi = require('joi');

const createCardSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().allow('').optional(),
  assigned_user: Joi.string().optional()
});

module.exports = {
  createCardSchema
};
