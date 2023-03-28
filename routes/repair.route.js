const express = require('express');

const repairRoute = express.Router();
const repairController = require('../controllers/repairs.controller');

repairRoute
  .route('/')
  .get(repairController.allRepairs)
  .post(repairController.createRepairs);

repairRoute
  .route('/:id')
  .get(repairController.allRepairs)
  .patch(repairController.createRepairs)
  .delete(repairController.deleteRepair);

module.exports = repairRoute;
