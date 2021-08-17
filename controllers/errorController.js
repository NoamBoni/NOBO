const AppError = require('../utils/appError');

const handleCastErrorDB = err => {
    const message = `invalid ${err.path}: ${err.value}`;
    return new AppError(message, 400);
};

const handleDuplicateFieldsDB = err => {
    const message =
        'invalid field ' +
        JSON.stringify(err.keyValue)
            .replace(/{|}|'|"/g, '')
            .replace(':', ': ');
    return new AppError(message, 400);
};

const handleValidationErrorDB = err => {
    const errors = Object.values(err.errors).map(err => err.message);
    const message = errors.join(', ');
    return new AppError(message, 400);
};

const sendErrorDev = (res, err) => {
    if (err.isOperational)
        res.status(err.statusCode).json({
            status: err.status,
            error: err,
            message: err.message,
            stack: err.stack,
        });
    else {
        res.status(500).json({
            status: 'error',
            message: 'something is wrong...',
            err,
        });
    }
};

const sendErrorProd = (res, err) => {
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
    });
};

const handleJsonWebTokenError = () => new AppError('please login again', 401);

const handleTokenExpiredError = () =>
    new AppError('session expired, login again', 401);

module.exports = (err, req, res, next) => {
    err.status = err.status || 'error';
    err.statusCode = err.statusCode || 500;

    if (process.env.NODE_ENV === 'development') sendErrorDev(res, err);
    else if (process.env.NODE_ENV == 'production') {
        let error = { ...err };
        if (error.name === 'CastError') error = handleCastErrorDB(error);
        if (error.code === 11000) error = handleDuplicateFieldsDB(error);
        if (error._message === 'Tour validation failed')
            error = handleValidationErrorDB(error);
        if (error.name === 'JsonWebTokenError')
            error = handleJsonWebTokenError();
        if (error.name === 'TokenExpiredError')
            error = handleTokenExpiredError();
        sendErrorProd(res, error);
    }
};
