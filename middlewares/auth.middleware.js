const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('../models/user.models');

exports.protect = catchAsync(
  async (req, res, next) => {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith(
        'Bearer'
      )
    ) {
      token =
        req.headers.authorization.split(' ')[1];
    }
    if (!token)
      return next(
        new AppError(
          'you are not logged in. please log in to get access'
        )
      );

    const decoded = await promisify(jwt.verify)(
      token,
      process.env.SECRET_JWT_SEED
    );

    const user = await User.findOne({
      where: {
        id: decoded.id,
        status: 'available',
      },
    });

    if (!user)
      return next(
        new AppError(
          'The owner of this account is not longer available',
          401
        )
      );
    req.sessionUser = user;

    next();
  }
);

exports.protectEmployeeAccount = catchAsync(
  async (req, res, next) => {
    const { sessionUser } = req;

    if (sessionUser.role !== 'employee')
      return next(
        new AppError(
          'The site is only for employees',
          401
        )
      );
    next();
  }
);

exports.protectAccountOwner = catchAsync(
  async (req, res, next) => {
    const { user, sessionUser } = req;

    if (sessionUser.id !== user.id) {
      return next(
        new AppError(
          'You do not own this account.',
          401
        )
      );
    }

    next();
  }
);
