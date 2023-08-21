const Joi = require('@hapi/joi');

function validateRequest(data, schema) {
  const validationOptions = {
    abortEarly: false, // Collect all validation errors
    allowUnknown: true // Allow unknown keys in the request data
  };

  const { error, value } = schema.validate(data, validationOptions);

  if (error) {
    const validationErrors = error.details.map(detail => detail.message);
    const validationError = new Error('Validation error');
    validationError.status = 400;
    validationError.validationErrors = validationErrors;
    throw validationError;
  }

  return value;
}

module.exports = validateRequest;
