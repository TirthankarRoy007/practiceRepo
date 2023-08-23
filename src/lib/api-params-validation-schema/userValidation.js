const Joi = require('@hapi/joi');

const userValidationSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

module.exports = userValidationSchema;
