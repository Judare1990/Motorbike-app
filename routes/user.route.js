const express = require('express');

const userRoute = express.Router();
const userController = require('../controllers/user.controller');

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
