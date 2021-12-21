const seeder = require('../../utils/seeder');
const storyModel = require('../../models/story');
const factory = require('../factories/story-factory');
const userModel = require('../../models/user');
const userFactory = require('../factories/user-factory');

/**
 * @param {Number} count
 * @param {Promise<Mongoose>} connection
 */
module.exports = async (count = 1, connection) => {
  await seeder(userModel, userFactory, {}, 20);

  const estimatedDocumentCount = await userModel.estimatedDocumentCount();
  const random = Math.floor(Math.random() * estimatedDocumentCount);

  const findRandom = await userModel.findOne().skip(random).exec();

  const storyFactory = async (faker) => {
    return factory(faker, findRandom);
  };

  seeder(storyModel, storyFactory, {}, count);

  (await connection).disconnect();
};
