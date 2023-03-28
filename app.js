const express = require('express');
const userRoute = require('./routes/user.route');
const repairRoute = require('./routes/repair.route');

const app = express();

app.use(express.json());

app.use('/api/v1/users', userRoute);
app.use('/api/v1/repairs', repairRoute);

module.exports = app;
