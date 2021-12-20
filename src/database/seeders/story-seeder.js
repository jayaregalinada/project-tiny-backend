const seeder = require('../../utils/seeder');
const StoryModel = require('../../models/story');
const factory = require('../factories/story-factory');
const UserModel = require('../../models/user');
const userFactory = require('../factories/user-factory');
const faker = require('faker');
const connect = require('../../connect');
const { database } = require('../../../config');

/**
 * @param {Number} count
 * @param {Promise<Mongoose>} connection
 */
module.exports = async (count = 1, connection) => {
  await seeder(UserModel, userFactory, {}, 20);

  const estimatedDocumentCount = await UserModel.estimatedDocumentCount();
  const random = Math.floor(Math.random() * estimatedDocumentCount);

  const findRandom = await UserModel.findOne().skip(random).exec();

  const storyFactory = async (faker) => {
    return factory(faker, findRandom);
  };

  seeder(StoryModel, storyFactory, {}, count);

  (await connection).disconnect();
};
