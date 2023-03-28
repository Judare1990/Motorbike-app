exports.allRepairs = (req, res) => {
  res.json({
    message: 'Hello, lets get all repairs',
  });
};

exports.createRepairs = (req, res) => {
  console.log(req.body);
  res.json({
    message: 'Hello, lets create repairs',
  });
};

exports.updateRepair = (req, res) => {
  res.json({
    message: 'Hello, lets update a repair by ID',
  });
};

exports.deleteRepair = (req, res) => {
  res.json({
    message: 'Hello, lets delete a repair by ID',
  });
};

exports.findOneRepair = (req, res) => {
  console.log(req.params.id);
  res.json({
    message: 'Hello, lets find a repair by ID',
  });
};
