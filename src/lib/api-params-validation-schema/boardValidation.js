const Joi = require('@hapi/joi');

const boardValidationSchema = Joi.object({
    name: Joi.string().required(),
    members: Joi.array().items(Joi.string())
});

module.exports = boardValidationSchema;