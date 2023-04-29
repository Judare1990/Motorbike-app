const express = require('express');

const userMiddleware = require('../middlewares/user.middleware');
const validations = require('./../middlewares/validations.middlewares');
const authMiddleware = require('../middlewares/auth.middleware');

const userController = require('../controllers/user.controller');
const userRoute = express.Router();

userRoute.post('/login', userController.login);

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
    authMiddleware.protect,
    userMiddleware.validUserExist,
    authMiddleware.protectAccountOwner,
    userController.updateUser
  )
  .delete(
    authMiddleware.protect,
    userMiddleware.validUserExist,
    authMiddleware.protectAccountOwner,
    userController.deleteUser
  );

module.exports = userRoute;
