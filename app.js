const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const userRoute = require('./routes/user.route');
const repairRoute = require('./routes/repair.route');
const globalErrorHandler = require('./middlewares/errors.controller');
const AppError = require('./utils/appError');

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

app.use('/api/v1/users', userRoute);
app.use('/api/v1/repairs', repairRoute);

app.use('*', (req, res, next) => {
  return next(
    new AppError(
      `cant find the route ${req.originalUrl} on this site, 404`
    )
  );
});

app.use(globalErrorHandler);

module.exports = app;
