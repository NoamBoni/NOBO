const Review = require('../models/reviewModel');
const factory = require('./handlerFactory');

exports.setUserAndId = (req, res, next) => {
    if (!req.body.tour) req.body.tour = req.params.tourId;
    if (!req.body.user) req.body.user = req.user.id;
    next();
};

exports.getReviews = factory.getAll(Review);

exports.deleteReview = factory.deleteOne(Review);

exports.updateReview = factory.updateOne(Review);

exports.createReview = factory.createOne(Review);

exports.getOneReview = factory.getOne(Review);
