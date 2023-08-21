const Joi = require('@hapi/joi');

const listValidationSchema = Joi.object({
    task: Joi.string().valid('ToDo', 'InProgress', 'Done').default('ToDo'),
    cards: Joi.array().items(Joi.string()),
    isDeleted: Joi.boolean().default(false)
});

module.exports = listValidationSchema;