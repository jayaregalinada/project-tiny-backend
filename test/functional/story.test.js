const { allTest } = require('./story/index');
const Database = require('../utils/database');
const config = require('../../config');

const db = Database.create(config.database);
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
})