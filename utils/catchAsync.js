const AppError = require('./appError');

module.exports = catchAsync = fnc => {
    return (req, res, next) => fnc(req, res, next).catch(next);
};
