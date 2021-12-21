const databaseConnect = require('../../src/connect');

module.exports = (config) => {
  const _config = config;
  let _database = null;

  const connect = async () => {
    const connect = await databaseConnect(_config);
    _database = await connect.connection;

    return connect;
  };

  const drop = async () => {
    (await _database).dropDatabase();
  };

  const close = async () => {
    (await _database).close();
  };

  return {
    connect,
    close,
    drop
  };
};
