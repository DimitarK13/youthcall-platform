const express = require('express');
const app = express();
const port = 7777;
const home = require('./routes/home');

app.use(express.static('./public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api/data', home);

app.listen(port, () => console.log(`Listening on port ${port}`));
