const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');

exports.deleteOne = Model =>
    catchAsync(async (req, res, next) => {
        const doc = await Model.findByIdAndDelete(req.params.id);

        if (!doc) return new AppError('wrong id', 404);

        res.status(204).json({
            status: 'success',
            message: 'deleted',
        });
    });

exports.updateOne = Model =>
    catchAsync(async (req, res, next) => {
        const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        return doc
            ? res.status(200).json({
                  status: 'success',
                  data: doc,
              })
            : next(new AppError('wrong id', 404));
    });

exports.createOne = Model =>
    catchAsync(async (req, res, next) => {
        const doc = await Model.create(req.body);
        res.status(200).json({
            status: 'success',
            data: doc,
        });
    });

exports.getOne = (Model, popOptions) =>
    catchAsync(async (req, res, next) => {
        const query = Model.findById(req.params.id);
        if (popOptions) query.populate('reviews');
        const doc = await query;
        return doc
            ? res.status(200).json({
                  status: 'success ',
                  data: doc,
              })
            : next(new AppError('wrong id', 404));
    });

exports.getAll = Model =>
    catchAsync(async (req, res, next) => {
        let filter = {};
        if (req.params.tourId) filter.tour = req.params.tourId;
        const features = new APIFeatures(Model.find(filter), req.query)
            .filter()
            .sort()
            .showFields()
            .paginate();
        const doc = await features.query;
        res.status(200).json({
            status: 'success',
            results: doc.length,
            data: doc,
        });
    });
