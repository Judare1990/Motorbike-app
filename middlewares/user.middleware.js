const User = require('../models/user.models');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

const validUserExist = catchAsync(
  async (req, res, next) => {
    const { id } = req.params;

    const user = await User.findOne({
      where: {
        id,
        status: 'available',
      },
    });

    if (!user)
      return next(
        new AppError('User was not found', 404)
      );
    req.user = user;
    next();
  }
);

module.exports = { validUserExist };
