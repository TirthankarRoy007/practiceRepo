const Joi = require('joi');

const createBoardSchema = Joi.object({
  name: Joi.string().required(),
  members: Joi.array().items(Joi.string()).optional()
});

const memberSchema = Joi.object({
  member: Joi.string().required()
});

module.exports = {
  createBoardSchema,
  memberSchema
};
