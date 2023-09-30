const express = require('express');
const app = express();
const port = 7777;
const posts = require('./routes/posts');
const login = require('./routes/login');

app.use(express.static('./public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api/data', posts);
app.use('/users/login', login);

app.listen(port, () => console.log(`Listening on port ${port}`));
