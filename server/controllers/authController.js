const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { promisify } = require('util');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const sendEmail = require('../utils/email');

const signToken = id => {
    const { JWT_SECRET, JWT_EXPIRATION } = process.env;
    return jwt.sign({ id }, JWT_SECRET, {
        expiresIn: JWT_EXPIRATION,
    });
};

const sendRes = (user, statusCode, res) => {
    const token = signToken(user._id);
    const cookieOptions = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRATION * 1000 * 60 * 60 * 24
        ),
        httpOnly: true,
    };

    if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;
    res.cookie('jwt', token, cookieOptions);

    user.password = undefined;
    res.status(statusCode).json({
        status: 'success',
        token,
        data: { user },
    });
};

exports.signup = catchAsync(async (req, res, next) => {
    const { email, password, name, confirmPassword, passwordChangedAt, role } =
        req.body;
    const newUser = await User.create({
        email,
        password,
        name,
        confirmPassword,
        passwordChangedAt,
        role,
    });

    sendRes(newUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password)
        return next(new AppError('please provide email AND password', 400));

    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.correctPassword(password, user.password)))
        return next(new AppError('invalid email or password', 401));

    sendRes(user, 200, res);
});

exports.protect = catchAsync(async (req, res, next) => {
    const { authorization } = req.headers;
    let token;
    if (authorization && authorization.startsWith('Bearer'))
        token = authorization.split(' ')[1];

    if (!token) return next(new AppError('you are not logged in', 401));

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    const freshUser = await User.findById(decoded.id);

    if (!freshUser)
        return next(new AppError('this user is no longer exist', 401));

    if (freshUser.passwordChangedAtAfter(decoded.iat))
        return next(new AppError('user recently changed password', 401));
    req.user = freshUser;
    next();
});

exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role))
            return next(
                new AppError('you are not allowed to perform this action', 403)
            );
        next();
    };
};

exports.forgotPassword = catchAsync(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return next(new AppError('user not found', 404));

    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });

    const newURL = `${req.protocol}://
    ${req.get('host')}
    /api/v1/users/resetPassword/${resetToken}`;
    const message = `Forgot your password to NOBO? click here ${newURL} to assign a new password. if you didn't ignore this`;
    const subject = 'Reset password - NOBO';

    try {
        await sendEmail({ email: user.email, subject, message });

        res.status(200).json({
            status: 'success',
            message: 'a reset email sent',
        });
    } catch (err) {
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save({ validateBeforeSave: false });
        next(new AppError('error sending reset email, try again later', 500));
    }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
    const hashedToken = crypto
        .createHash('sha256')
        .update(req.params.token)
        .digest('hex');

    const user = await User.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: { $gt: Date.now() },
    });
    if (!user) next(new AppError('invalid or expired token', 400));

    user.password = req.body.password;
    user.confirmPassword = req.body.confirmPassword;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    sendRes(user, 200, res);
});

exports.updatePassword = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.user.id).select('+password');

    if (!(await user.correctPassword(req.body.currentPassword, user.password)))
        next(new AppError('invalid password', 401));

    user.password = req.body.newPassword;
    user.confirmPassword = req.body.confirmPassword;
    await user.save();

    sendRes(user, 200, res);
});
