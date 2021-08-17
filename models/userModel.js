const mongoose = require('mongoose');
const crypto = require('crypto');
const { isEmail } = require('validator');
const { hash, compare } = require('bcryptjs');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'a user must have an email'],
        unique: [true, 'this email is already used'],
        validate: [isEmail, 'invalid email'],
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, 'a user must have a password'],
        maxlength: [20, 'maximum password length is 20'],
        minlength: [8, 'minimum password length is 8'],
        select: false,
    },
    name: {
        type: String,
        required: [true, 'a user must have a name'],
        maxlength: [20, 'maximum name length is 20'],
        minlength: [4, 'minimum name length is 4'],
    },
    confirmPassword: {
        type: String,
        required: [true, 'please confirm the password'],
        maxlength: [20, 'maximum password length is 20'],
        minlength: [8, 'minimum password length is 8'],
        validate: {
            validator: function (val) {
                return val === this.password;
            },
            message: "password doesn't match",
        },
    },
    photo: {
        type: String,
    },
    passwordChangedAt: Date,
    role: {
        type: String,
        enum: ['admin', 'user', 'guide', 'lead guide'],
        default: 'user',
    },
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: {
        type: Boolean,
        default: true,
        select: false,
    },
});

userSchema.pre('save', function (next) {
    if (!this.isModified('password') || this.isNew) return next();
    this.passwordChangedAt = Date.now() - 1000;
    next();
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    this.password = await hash(this.password, 12);
    this.confirmPassword = undefined;
    next();
});

userSchema.pre(/^find/, function (next) {
    this.find({ active: { $ne: false } });
    next();
});

userSchema.methods.correctPassword = async function (toCheckPswrd, userPswrd) {
    return await compare(toCheckPswrd, userPswrd);
};

userSchema.methods.passwordChangedAtAfter = function (JWTTimeStamp) {
    if (this.passwordChangedAt)
        return passwordChangedAt.getTime() / 1000 > JWTTimeStamp;

    return false;
};

userSchema.methods.createPasswordResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString('hex');
    this.passwordResetToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
    return resetToken;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
