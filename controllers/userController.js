const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const filterBody = (body, ...fields) => {
    const newObj = {};
    Object.keys(body).forEach(el => {
        if (fields.includes(el)) newObj[el] = body[el];
    });
    return newObj;
};

exports.getAllUsers = catchAsync(async (req, res, next) => {
    const users = await User.find();
    res.status(200).json({
        status: 'success',
        results: users.length,
        data: { users },
    });
});

exports.createUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'route not implemented yet',
    });
};

exports.getUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'route not implemented yet',
    });
};

exports.updateMe = catchAsync(async (req, res, next) => {
    //req.body = {user,newName,newEmail,newPhoto}
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

exports.updateUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'route not implemented yet',
    });
};

exports.deleteUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'route not implemented yet',
    });
};
