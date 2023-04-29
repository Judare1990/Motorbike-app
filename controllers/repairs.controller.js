const Repair = require('./../models/repair.models');
const User = require('../models/user.models');

exports.allRepairs = async (req, res) => {
  const repairs = await Repair.findAll({
    where: {
      status: 'pending',
    },
    include: [
      {
        model: User,
      },
    ],
  });

  res.status(200).json({
    message:
      'the query has been done succesfully',
    results: repairs.length,
    repairs,
  });
};

exports.createRepairs = async (req, res) => {
  const { date, userId } = req.body;

  const repair = await Repair.create({
    date,
    userId,
  });

  res.status(201).json({
    status: 'success',
    message:
      'the repair has been created succesfully',
    repair,
  });
};

exports.findOneRepair = async (req, res) => {
  const { id } = req.params;

  const repair = await Repair.findOne({
    where: {
      id,
      status: 'pending',
    },
  });

  if (!repair) {
    return res.status(404).json({
      status: 'error',
      message: 'the repair was not found',
    });
  }

  res.status(200).json({
    status: 'success',
    message:
      'The repair has been done successfully',
    repair,
  });
};

exports.updateRepair = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const repair = await Repair.findOne({
    where: {
      id,
      status: 'pending',
    },
  });

  if (!repair) {
    return res.status(404).json({
      status: 'error',
      message: 'The repair was not found',
    });
  }

  await repair.update({
    status,
  });

  res.json({
    message: 'the repair was completed',
  });
};

exports.deleteRepair = async (req, res) => {
  const { id } = req.params;
  const repair = await Repair.findOne({
    where: {
      id,
      status: 'pending',
    },
  });

  if (!repair) {
    return res.status(404).json({
      status: 'error',
      message: 'The repair was not found',
    });
  }

  await repair.update({
    status: 'cancelled',
  });

  res.json({
    message: 'the repair was deleted',
  });
};
