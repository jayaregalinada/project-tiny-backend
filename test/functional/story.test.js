const { describe, beforeAll, beforeEach, afterAll } = require('@jest/globals');
const { allTest } = require('./story/index');
const database = require('../utils/database');
const config = require('../../config');

const db = database(config.database);
describe('All test for Story', () => {
  beforeAll(async () => {
    await db.connect();
  });

  beforeEach(async () => {
    await db.drop();
  });

  afterAll(async () => {
    await db.close();
  });

  describe('When trying to get all stories', allTest);
});
