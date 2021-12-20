const { getObjectId } = require('mongo-seeding');
const faker = require('faker');
const { Types } = require('mongoose');
const factory = require('../../../src/database/factories/story-factory');

module.exports = (count = 1, user) => {
  let stories = [];

  for (let i = 0; i < count; i++) {
    stories.push(factory(faker, user));
  }

  return stories;
};
