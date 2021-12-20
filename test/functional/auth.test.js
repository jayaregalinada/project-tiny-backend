const { loginTest, profileTest } = require('./auth/index');
const Database = require('../utils/database');
const config = require('../../config');

const db = Database.create(config.database);
describe('All test for authentication', () => {
  beforeAll(async () => {
    await db.connect();
  });

  beforeEach(async () => {
    await db.drop();
  });

  afterAll(async () => {
    await db.close();
  });

  describe('When trying to login', loginTest);

  describe('When trying to get my profile information', profileTest);
});
