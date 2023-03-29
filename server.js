require('dotenv').config();

const app = require('./app');
const { db } = require('./database/config');

db.authenticate()
  .then(() =>
    console.log('database authenticated')
  )
  .catch((error) => console.log(error));

db.sync()
  .then(() => console.log('database sync'))
  .catch((error) => console.log(error));

const port = process.env.PORT;

app.listen(port, () => {
  console.log(port);
});
