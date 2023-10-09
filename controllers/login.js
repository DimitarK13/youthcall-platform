const Account = require('../models/Account');

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const accounts = await Account.find({});

    if (!username || !password)
      return res
        .status(406)
        .json({ success: false, data: 'Please enter username and password' });

    const account = accounts.find((acc) => acc.username === username);

    if (!account)
      return res.status(401).json({
        success: false,
        data: `Account with username: ${username} doesn't exist. Please check username`,
      });

    if (account.password !== password)
      return res
        .status(401)
        .json({ success: false, data: 'The password is incorect' });

    res.status(200).json({
      success: true,
      data: `${account.name} (${account.username}) Logged In`,
    });
  } catch (err) {
    console.error(err);
  }
};

module.exports = login;
