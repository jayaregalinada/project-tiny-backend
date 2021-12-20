/**
 * @param {import('../../typedefs').UserMongooseModel} userModel
 *
 * @returns {import('../../typedefs').UserResource}
 */
module.exports = (userModel) => {
  const { _id, firstName, lastName, email, username, avatar } = userModel;

  return {
    id: _id,
    firstName,
    lastName,
    fullName: `${firstName} ${lastName}`,
    email,
    username,
    avatar,
  };
};
