const ERRORS = require('./errors')

class BadRequestDataTypeError extends Error {
	constructor (message = ERRORS.BAD_PARAMETER_DATA_TYPE_ERROR.message, params) {
		super(message)
		this.name = ERRORS.BAD_PARAMETER_DATA_TYPE_ERROR.name
		this.status = ERRORS.BAD_PARAMETER_DATA_TYPE_ERROR.status
	}
}

module.exports = BadRequestDataTypeError