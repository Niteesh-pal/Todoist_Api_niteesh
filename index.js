const express = require('express');
const todo_routes = require('./routes/routes.js');
const db = require('./config/db_connect.js');
const app = express();
const PORT = 5000;

app.use(express.json())

app.use('/', todo_routes);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
  db.authenticate()
    .then(() => console.log('connected'))
    .catch((err) => console.log(err));
});