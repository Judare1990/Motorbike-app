const {
  body,
  validationResult,
} = require('express-validator');

const validateFields = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'error',
      errors: errors.mapped(),
    });
  }

  next();
};

exports.createRepairValidation = [
  body('date')
    .notEmpty()
    .withMessage('Date cannot be empty')
    .isDate()
    .withMessage('Must be a valid date'),

  body('userId')
    .notEmpty()
    .withMessage('userId cannot be empty')
    .isNumeric()
    .withMessage('must be a valid useriD'),
  validateFields,
];

exports.createUserValidations = [
  body('name')
    .notEmpty()
    .withMessage('name cannot be empty')
    .isString()
    .withMessage('must be a valid name'),

  body('email')
    .notEmpty()
    .withMessage('email cannot be empty')
    .isEmail()
    .withMessage('must be a valid email'),

  body('password')
    .notEmpty()
    .withMessage('password cannot be empty')
    .isLength({ min: 6 })
    .withMessage(
      'must be at least 6 charachters'
    ),
  validateFields,
];
