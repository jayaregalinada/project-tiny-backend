const databaseConnect = require('../../src/connect');

module.exports = class Database {
  database;

  static create(config) {
    return new Database(config);
  }

  constructor(config) {
    this._config = config;
  }

  async connect() {
    const connect = await databaseConnect(this._config);
    this.database = await connect.connection;

    return connect;
  }

  async drop() {
    (await this.database).dropDatabase();
  }

  async close() {
    (await this.database).close();
  }
};
