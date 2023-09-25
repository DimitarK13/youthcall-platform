const express = require('express');
const app = express();
const port = 7777;

app.get('/', (req, res) => {
  res.send('Welcome to YouthCall Platform');
});

app.listen(port, () => console.log(`Listening on port ${port}`));
