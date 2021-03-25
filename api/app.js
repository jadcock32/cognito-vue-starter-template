'use strict'

const express = require('express');
const app = express();
const cors = require('cors');

const port = 5000;

app.set('port', port);
app.use(express.json());
app.use(express.urlencoded());

app.use(cors({ origin: '*' }));

// Routes
const Authentication = require('./controllers/authentication');
const authorizer = (req, res, next) => new Authentication().authorized(req, res, next);

require('./routes/authentication')(app, authorizer);
require('./routes/content')(app, authorizer);

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
