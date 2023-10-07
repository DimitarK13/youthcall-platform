const { accounts } = require('../testData');

const login = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    res
      .status(406)
      .json({ success: false, data: 'Please enter username and password' });

  const account = accounts.find((acc) => acc.username === username);

  if (!account)
    res.status(401).json({
      success: false,
      data: `Account with username: ${username} doesn't exist. Please check username`,
    });

  if (account.password !== password)
    res.status(401).json({ success: false, data: 'The password is incorect' });

  res.status(200).json({
    success: true,
    data: `${account.name} (${account.username}) Logged In`,
  });
};

module.exports = login;
