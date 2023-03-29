const express = require('express');

const userController = require('../controllers/user.controller');
const userRoute = express.Router();

userRoute
  .route('/')
  .get(userController.allUsers)
  .post(userController.createUsers);

userRoute
  .route('/:id')
  .get(userController.findOneUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = userRoute;
