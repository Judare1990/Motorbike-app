const AppError = require('../utils/appError');
const User = require('./../models/user.models');
const catchAsync = require('../utils/catchAsync');
const bcrypt = require('bcryptjs');
const generateJWT = require('../utils/jwt');

exports.allUsers = async (req, res) => {
  const users = await User.findAll({
    where: {
      status: 'available',
    },
  });
  res.status(200).json({
    message:
      'the query has been done succesfully',
    results: users.length,
    users,
  });
};

exports.createUsers = async (req, res) => {
  const { name, email, password, role } =
    req.body;

  const salt = await bcrypt.genSalt(10);
  const encryptedPassword = await bcrypt.hash(
    password,
    salt
  );
  const user = await User.create({
    name,
    email,
    password: encryptedPassword,
    role,
  });

  res.status(201).json({
    status: 'success',
    message: 'the user has been created',
    user,
  });
};

exports.login = catchAsync(
  async (req, res, next) => {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: {
        email,
        status: 'available',
      },
    });

    if (!user)
      return next(
        new AppError('User not found', 404)
      );

    if (
      !(await bcrypt.compare(
        password,
        user.password
      ))
    )
      return next(
        new AppError(
          'Incorrect email or password',
          401
        )
      );

    const token = await generateJWT(user.id);

    res.status(200).json({
      status: 'success',
      message: 'User has been logged in',
      token,
    });
  }
);

exports.findOneUser = catchAsync(
  async (req, res, next) => {
    const { user } = req;

    res.status(200).json({
      status: 'success',
      message:
        'the user has been done successfully',
      user,
    });
  }
);

exports.updateUser = async (req, res) => {
  const { user } = req;
  const { name, email } = req.body;

  await user.update({
    name,
    email,
  });

  res.status(200).json({
    status: 'success',
    message:
      'The query has been done succesfully',
  });
};

exports.deleteUser = async (req, res) => {
  const { user } = req;

  await user.update({
    status: 'disabled',
  });
  res.status(200).json({
    message:
      'The user has been deleted successfully',
  });
};
