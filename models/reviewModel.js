const mongoose = require('mongoose');
const Tour = require('./tourModel');

const reviewSchema = new mongoose.Schema(
    {
        review: {
            type: String,
            required: [true, 'you must add a review'],
            trim: true,
            maxlength: [200, 'maximum review length is 100'],
            minlength: [10, 'minimum name length is 10'],
        },
        rating: {
            type: Number,
            required: [true, 'you must add a rating'],
            min: 1,
            max: 5,
        },
        createdAt: {
            type: Date,
            default: Date.now(),
        },
        user: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: [true, 'a review must belong to a user'],
        },
        tour: {
            type: mongoose.Schema.ObjectId,
            ref: 'Tour',
            required: [true, 'a review must be about a specific tour'],
        },
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

reviewSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'user',
        select: 'name',
    });
    next();
});

reviewSchema.statics.calcAvrgRating = async function (tourId) {
    const stats = await this.aggregate([
        {
            $match: { tour: tourId },
        },
        {
            $group: {
                _id: '$tour',
                nRating: { $sum: 1 },
                avgRating: { $avg: '$rating' },
            },
        },
    ]);
    if (stats.length > 0)
        await Tour.findByIdAndUpdate(this.tour, {
            ratingsAverage: stats[0].avgRating,
            ratingsQuantity: stats[0].nRating,
        });
    else
        await Tour.findByIdAndUpdate(this.tour, {
            ratingsAverage: 4.5,
            ratingsQuantity: 0,
        });
};

reviewSchema.post('save', async function () {
    this.constructor.calcAvrgRating(this.tour);
});

reviewSchema.pre(/^findOneAnd/, async function (next) {
    this.rev = await this.findOne();
    next();
});

reviewSchema.post(/^findOneAnd/, async function () {
    await this.rev.constructor.calcAvrgRating(this.rev.tour);
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
