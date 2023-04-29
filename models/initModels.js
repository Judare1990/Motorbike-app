const User = require('../models/user.models');
const Repair = require('../models/repair.models');

const initModel = () => {
  User.hasMany(Repair);
  Repair.belongsTo(User);
};

module.exports = initModel;
