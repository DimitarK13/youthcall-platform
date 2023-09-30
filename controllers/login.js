const { accounts } = require('../testData');

const login = (req, res, next) => {
  const { username, password } = req.body;
  const account = accounts.find((acc) => acc.username === username);

  if (!account) {
    res
      .status(401)
      .send(
        `Account with username: ${username} doesn't exist. Please check username`
      );
  }
  if (account.password !== password)
    res.status(401).send('The password is incorect');

  res.status(200).send('User Loged In');

  next();
};

module.exports = login;
