const Tour = require('../models/tourModel');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

//we can use middliewares to update the query

exports.getTours = catchAsync(async (req, res, next) => {
    const features = new APIFeatures(Tour.find(), req.query)
        .filter()
        .sort()
        .showFields()
        .paginate();
    const tours = await features.query;
    res.status(200).json({
        status: 'success',
        results: tours.length,
        data: { tours },
    });
});

exports.addTour = catchAsync(async (req, res, next) => {
    const newTour = await Tour.create(req.body);
    res.status(200).json({
        status: 'success',
        data: { tour: newTour },
    });
});

exports.getTour = catchAsync(async (req, res, next) => {
    const tour = await Tour.findById(req.params.id);
    tour
        ? res.status(200).json({
              status: 'success ',
              data: { tour },
          })
        : next(new AppError('wrong id', 404));
});

exports.updateTour = catchAsync(async (req, res, next) => {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });
    tour
        ? res.status(200).json({
              status: 'success',
              tour,
          })
        : next(new AppError('wrong id', 404));
});

exports.deleteTour = catchAsync(async (req, res, next) => {
    // const tour = await Tour.findByIdAndDelete(req.params.id);
    Tour.findByIdAndDelete(req.params.id).catch(() =>
        next(new AppError('wrong id', 404))
    );
    // tour ?
        res.status(204).json({
              status: 'success',
              message: 'deleted',
          })
        // : next(new AppError('wrong id', 404));
});

exports.getTourStats = catchAsync(async (req, res, next) => {
    const stats = await Tour.aggregate([
        {
            $match: { ratingsAverage: { $gte: 4.5 } },
        },
        {
            $group: {
                _id: { $toUpper: '$difficulty' },
                numTours: { $sum: 1 },
                numRatings: { $sum: '$ratingsQuantity' },
                avgRating: { $avg: '$ratingsAverage' },
                avgPrice: { $avg: '$price' },
                minPrice: { $min: '$price' },
                maxPrice: { $max: '$price' },
            },
        },
        {
            $sort: { avgPrice: 1 },
        },
        // {
        //   $match: { _id: { $ne: 'EASY' } }
        // }
    ]);

    res.status(200).json({
        status: 'success',
        data: {
            stats,
        },
    });
});

exports.getMonthlyPlan = catchAsync(async (req, res, next) => {
    const year = req.params.year * 1;
    const plan = await Tour.aggregate([
        {
            $unwind: '$startDates',
        },
        {
            $match: {
                startDates: {
                    $gte: new Date(`${year}-01-01`),
                    $lte: new Date(`${year}-12-31`),
                },
            },
        },
        {
            $group: {
                _id: { $month: '$startDates' },
                numOfTours: { $sum: 1 },
                tours: { $push: '$name' },
            },
        },
        {
            $addFields: { month: '$_id' },
        },
        {
            $project: {
                _id: 0,
            },
        },
        {
            $sort: { numOfTours: -1 },
        },
        {
            $limit: 6,
        },
    ]);

    res.status(200).json({
        status: 'success',
        results: plan.length,
        data: {
            plan,
        },
    });
});
