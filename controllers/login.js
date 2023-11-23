const Account = require('../models/Account');

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const accounts = await Account.find({});

    if (!username || !password)
      return res.status(406).json({
        success: false,
        data: 'Задолжително корисничко име и лозинка',
      });

    const account = accounts.find((acc) => acc.username === username);

    if (!account)
      return res.status(401).json({
        success: false,
        data: `Акаунт со корисничко име: ${username} не постои. Ве молиме обидете се повторно!`,
      });

    if (account.password !== password)
      return res.status(401).json({ success: false, data: 'Погрешна лозинка' });

    res.status(200).json({
      success: true,
      data: {
        loggedIn: true,
        username,
        accountName: account.name,
        website: account.website,
      },
    });
  } catch (err) {
    console.error(err);
  }
};

module.exports = login;
