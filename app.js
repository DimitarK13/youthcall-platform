const express = require('express');
const app = express();
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

const start = async () => {
  try {
    await connectDB(process.env.DB_URI);
    app.listen(port, () => console.log(`Listening on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
