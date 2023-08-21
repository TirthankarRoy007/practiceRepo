const Joi = require('@hapi/joi');

const cardValidationSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string(),
    assigned_user: Joi.string(),
    isDeleted: Joi.boolean().default(false)
});

module.exports = cardValidationSchema;
