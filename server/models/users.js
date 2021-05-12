const Users = require('../../database/schemas/users.js');
const { createRandom32String, createHash } = require('../../lib/hashUtils.js');

module.exports = {
  get: (username) => Users.findOne({ username }),
  create: (username, password) => {
    const salt = createRandom32String();
    const hashedPassword = createHash(password, salt);
    const user = {
      username,
      password: hashedPassword,
      salt,
    };
    return Users.create(user);
  },
};
