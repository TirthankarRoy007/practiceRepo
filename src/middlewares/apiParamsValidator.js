const { BadRequestParameterError } = require('../lib/errors');

const apiParamsValidator = {
  middleware: ({ schema }) => (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      throw new BadRequestParameterError(error.details[0].message);
    }
    next();
  },
};

module.exports = apiParamsValidator;
