exports.allUsers = (req, res) => {
  res.json({
    message: 'Hello, lets get all users',
  });
};

exports.createUsers = (req, res) => {
  console.log(req.body);
  res.json({
    message: 'Hello, lets create users',
  });
};

exports.updateUser = (req, res) => {
  console.log(req.body);
  res.json({
    message: 'Hello, lets update an user by ID',
  });
};

exports.deleteUser = (req, res) => {
  res.json({
    message: 'Hello, lets delete an user by ID',
  });
};

exports.findOneUser = (req, res) => {
  console.log(req.params.id);
  res.json({
    message: 'Hello, lets find an user by ID',
  });
};
