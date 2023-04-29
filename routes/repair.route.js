const express = require('express');

const validateFields = require('../middlewares/validations.middlewares');
const repairController = require('../controllers/repairs.controller');
const repairRoute = express.Router();

repairRoute
  .route('/')
  .get(repairController.allRepairs)
  .post(
    validateFields.createRepairValidation,
    repairController.createRepairs
  );

repairRoute
  .route('/:id')
  .get(repairController.allRepairs)
  .patch(repairController.updateRepair)
  .delete(repairController.deleteRepair);

module.exports = repairRoute;
