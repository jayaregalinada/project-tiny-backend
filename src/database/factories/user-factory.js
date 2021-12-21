const { hashSync } = require('bcrypt');

/**
 * @param {Faker.FakerStatic} faker
 */
module.exports = (faker) => {
  const { firstName, lastName } = faker.name;
  const { email, userName, avatar } = faker.internet;

  const user = {
    firstName: firstName(),
    lastName: lastName()
  };

  return {
    ...user,
    email: email(user.firstName, user.lastName).toLowerCase(),
    username: userName(user.firstName, user.lastName),
    password: hashSync('password', 10),
    avatar: avatar(),
    createdAt: new Date(),
    updatedAt: new Date()
  };
};
