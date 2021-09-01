const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const factory = require('./handlerFactory');

const filterBody = (body, ...fields) => {
    const newObj = {};
    Object.keys(body).forEach(el => {
        if (fields.includes(el)) newObj[el] = body[el];
    });
    return newObj;
};

exports.updateMe = catchAsync(async (req, res, next) => {
    if (req.body.password || req.body.confirmPassword)
        return next(new AppError("you can't update your password here", 400));

    const filteredBody = filterBody(req.body, 'name', 'email');
    const updatedUser = await User.findByIdAndUpdate(
        req.user.id,
        filteredBody,
        {
            new: true,
            runValidators: true,
        }
    );

    res.status(200).json({
        status: 'success',
        data: { user: updatedUser },
    });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
    await User.findByIdAndUpdate(req.user.id, { active: false });
    res.status(204).json({
        status: 'success',
        message: 'user deleted',
    });
});

exports.updateUser = factory.updateOne(User);

exports.deleteUser = factory.deleteOne(User);

exports.getAllUsers = factory.getAll(User);

exports.createUser = factory.createOne(User);

exports.getUser = factory.getOne(User);

exports.getMe = (req, res, next) => {
    req.params.id = req.user.id;
    next();
};