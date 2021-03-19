require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

// Routes
const routes = require('./routes/index');
const ghostquests = require('./routes/ghostquest');

app.use('/', routes);
app.use('/ghostquest', ghostquests);

app.listen(port, () => {
  console.log(`Server is started on port ${port}...`)
});
