const { User } = require('../models');
const argon = require('argon2');

module.exports = {
  register: async (username, password, email) => {
    let message = {};
    if (
      typeof username === 'string' &&
      typeof password === 'string' &&
      typeof email === 'string'
    ) {
      const hash = await argon.hash(password, {
        type: argon.argon2id,
        memoryCost: 2 ** 16,
        hashLength: 128,
        parallelism: 4,
        timeCost: 4,
        saltLength: 64,
      });
      const date = new Date();
      const user = new User({
        username,
        password: hash,
        email,
        created: date,
        updated: date,
        active: date,
      });
      user.save((err, result) => {
        if (err) message = { message: 'failed to create account' };
        else
          message = {
            username: result.username,
            created: result.created.getTime(),
          };
      });
    } else message = { message: 'invalid parameter types' };
    return message;
  },
  login: async (username, password) => {},
  delete: async (username, password) => {},
};
