const User = require('./../models/user.models');

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

  const user = await User.create({
    name,
    email,
    password,
    role,
  });

  res.status(201).json({
    status: 'success',
    message: 'the user has been created',
    user,
  });
};
exports.findOneUser = async (req, res) => {
  const { id } = req.params;

  const user = await User.findOne({
    where: {
      id,
      status: 'available',
    },
  });
  if (!user) {
    return res.status(404).json({
      status: 'error',
      message: 'the user was not found',
    });
  }
  res.status(200).json({
    status: 'success',
    message:
      'the user has been done successfully',
    user,
  });
};
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  const user = await User.findOne({
    where: {
      id,
      status: 'available',
    },
  });

  if (!user) {
    return res.status(404).json({
      status: 'error',
      message: 'The user was not found',
    });
  }

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
  const { id } = req.params;
  const user = await User.findOne({
    where: {
      id,
      status: 'available',
    },
  });

  if (!user) {
    return res.status(404).json({
      status: 'error',
      message: 'The user was not found',
    });
  }
  await user.update({
    status: 'disabled',
  });
  res.status(200).json({
    message:
      'The user has been deleted successfully',
  });
};
