const faker = require('faker');
const factory = require('../../../src/database/factories/story-factory');

module.exports = (count = 1, user) => {
  const stories = [];

  for (let i = 0; i < count; i++) {
    stories.push(factory(faker, user));
  }

  return stories;
};
