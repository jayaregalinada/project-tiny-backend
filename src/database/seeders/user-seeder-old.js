const { Seeder } = require('mongo-seeding');
const faker = require('faker');
const { hashSync } = require('bcrypt');
const { database } = require('../../../config');
const UserModel = require('../../models/user');

const seeder = new Seeder({
  database,
});

const createFakerUser = () => {
  const { firstName, lastName } = faker.name;
  const { email, userName, avatar } = faker.internet;

  let user = {
    firstName: firstName(),
    lastName: lastName(),
  };

  user.email = email(user.firstName, user.lastName).toLowerCase();
  user.username = userName(user.firstName, user.lastName);
  user.password = hashSync('password', 10);
  user.avatar = avatar();
  user.createdAt = new Date();
  user.updatedAt = new Date();

  return user;
};

(async () => {
  let documents = [];
  for (i = 0; i < 10; i++) {
    documents.push(createFakerUser());
  }

  try {
    await seeder.import(
      [
        {
          name: UserModel.collection.name,
          documents,
        },
      ],
      {
        transformers: [
          Seeder.Transformers.setCreatedAtTimestamp,
          Seeder.Transformers.setUpdatedAtTimestamp,
        ],
      },
    );
  } catch (error) {
    console.error(error);
  }
})();
