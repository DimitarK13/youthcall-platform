const express = require('express');
const app = express();
const port = 7777;
const home = require('./routes/home');

app.use('/', home);

app.listen(port, () => console.log(`Listening on port ${port}`));
