const Joi = require('joi');

const listSchema = Joi.object({
  task: Joi.string().required(),
});

module.exports = {
  listSchema,
};