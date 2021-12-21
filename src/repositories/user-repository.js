const { compare } = require('bcrypt');
const UserNotFoundException = require('../exceptions/user-not-found-exception');
const userModel = require('../models/user');

/**
 * Find user by credentials: email and password
 *
 * @param {String} email
 * @param {String} password
 *
 * @returns {import('../../typedefs').UserMongooseModel|undefined}
 */
exports.findByCredentials = async (email, password) => {
  /** @type {import('../../typedefs').UserMongooseModel|null} */
  const user = await userModel
    .findOne({
      email,
    })
    .select('+password');

  if (user === null) {
    throw new UserNotFoundException();
  }

  const isMatch = await compare(password, user.password);

  return isMatch ? user : null;
};
