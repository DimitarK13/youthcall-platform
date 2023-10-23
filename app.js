const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config();
const port = 7777;
const posts = require('./routes/posts');
const login = require('./routes/login');
const connectDB = require('./db/connect');

app.use(express.static('./public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api/data', posts);
app.use('/users/login', login);
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

const start = async () => {
  try {
    await connectDB(process.env.DB_URI);
    app.listen(port, () => console.log(`Listening on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
