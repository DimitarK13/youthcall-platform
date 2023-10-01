const { accounts } = require('../testData');

const login = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    res.status(406).send('Please enter username and password');

  const account = accounts.find((acc) => acc.username === username);
  console.log(account);

  if (!account)
    res
      .status(401)
      .send(
        `Account with username: ${username} doesn't exist. Please check username`
      );

  if (account.password !== password)
    res.status(401).send('The password is incorect');

  res.status(200).send(`${account.name} (${account.username}) Logged In`);
};

module.exports = login;
