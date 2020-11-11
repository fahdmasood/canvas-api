const { User } = require('../models');
const argon = require('argon2');
const jwt = require('jsonwebtoken');

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
      user.save((err, doc) => {
        if (err) message = { message: 'failed to create account' };
        else
          message = {
            username: doc.username,
            created: doc.created.getTime(),
          };
      });
    } else message = { message: 'invalid parameter types' };
    return message;
  },
  login: async (username, password) => {
    let message = {};
    if (typeof username === 'string' && typeof password === 'string') {
      await User.findOne({ username })
        .select('password', 'username', 'email', 'active')
        .exec(async (err, doc) => {
          if (err) message = { message: 'invalid username or password' };
          else if (doc) {
            await argon.verify(doc.password, password).then(async success => {
              if (success)
                jwt.sign(
                  {
                    username: doc.username,
                    email: doc.email,
                    active: doc.active,
                  },
                  process.env.SECRET,
                  { expiresIn: 60 * 60 },
                  (error, token) => {
                    if (error)
                      message = { message: 'token could not be generated' };
                    else {
                      message = {
                        token: token,
                      };
                    }
                  }
                );
            });
          }
        });
    } else message = { message: 'invalid parameter types' };
    return message;
  },
  delete: async token => {
    let message = {};
    if (typeof token === 'string') {
      await jwt.verify(token, process.env.SECRET, async (err, result) => {
        if (err) message = { message: 'invalid token' };
        else {
          await User.remove({ username: result.username }, error => {
            if (error) message = { message: 'account could not be deleted' };
            else message = { message: 'account deleted' };
          });
        }
      });
    } else message = { message: 'invalid parameter types' };
    return message;
  },
};
