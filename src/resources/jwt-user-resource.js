const userResource = require('./user-resource');

/**
 * @param {import('../../typedefs').UserMongooseModel} userModel
 *
 * @returns {import('../../typedefs').JWTUserModel}
 */
module.exports = (userModel) => {
  let user = userResource(userModel);

  user.sub = user.id;

  delete user.id;

  const { firstName, lastName } = user;

  return {
    ...user,
    name: `${firstName} ${lastName}`,
  };
};
