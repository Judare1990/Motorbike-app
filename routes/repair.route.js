const express = require('express');

const repairController = require('../controllers/repairs.controller');
const repairRoute = express.Router();

repairRoute
  .route('/')
  .get(repairController.allRepairs)
  .post(repairController.createRepairs);

repairRoute
  .route('/:id')
  .get(repairController.allRepairs)
  .patch(repairController.updateRepair)
  .delete(repairController.deleteRepair);

module.exports = repairRoute;
