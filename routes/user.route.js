const express = require('express');

const userMiddleware = require('../middlewares/user.middleware');
const validations = require('./../middlewares/validations.middlewares');

const userController = require('../controllers/user.controller');
const userRoute = express.Router();

userRoute
  .route('/')
  .get(userController.allUsers)
  .post(
    validations.createUserValidations,
    userController.createUsers
  );

userRoute
  .route('/:id')
  .get(
    userMiddleware.validUserExist,
    userController.findOneUser
  )
  .patch(
    userMiddleware.validUserExist,
    userController.updateUser
  )
  .delete(
    userMiddleware.validUserExist,
    userController.deleteUser
  );

module.exports = userRoute;
