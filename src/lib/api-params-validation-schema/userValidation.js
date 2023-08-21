const Joi = require('@hapi/joi');

const userValidationSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required()
});

module.exports = userValidationSchema;
