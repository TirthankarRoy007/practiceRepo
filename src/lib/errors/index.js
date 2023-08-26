const UnauthenticatedError = require('./unauthenticatedError');
const UnauthorisedError = require('./unauthorisedError');
const NoRecordFoundError = require('./noRecordFoundError');
const DuplicateRecordFoundError = require('./duplicateRecordFound');
const BadRequestParameterError = require('./badRequestParameterError');
const ConflictError = require('./coflictError')
const BadRequestDataTypeError = require('./badRequestDataTypeError');

exports.UnauthenticatedError = UnauthenticatedError;
exports.UnauthorisedError = UnauthorisedError;
exports.NoRecordFoundError = NoRecordFoundError;
exports.DuplicateRecordFoundError = DuplicateRecordFoundError;
exports.BadRequestParameterError = BadRequestParameterError;
exports.ConflictError = ConflictError;
exports.BadRequestDataTypeError = BadRequestDataTypeError;
