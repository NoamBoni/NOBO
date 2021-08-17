const express = require('express');
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const AppError = require('./utils/appError');
const errController = require('./controllers/errorController');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitizer = require('express-mongo-sanitize');
const xss = require('xss');
const hpp = require('hpp');

const app = express();

app.use(helmet());
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));
const limiter = rateLimit({
    max: 100,
    windowMs: 10 * 60 * 60,
    message: 'too many requests, try again in an hour',
});
app.use('/api', limiter);

app.use(express.json({ limit: '10kb' }));
app.use(mongoSanitizer());
app.use(xss());
app.use(hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'maxGroupSize',
      'difficulty',
      'price'
    ]
}));
app.use(express.static(`${__dirname}/public`));

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
    next(new AppError(`can't find ${req.originalUrl}`, 404));
});

app.use(errController);

module.exports = app;
