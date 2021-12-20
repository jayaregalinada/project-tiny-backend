const { connect, ConnectOptions, Mongoose, connection } = require('mongoose');
const debug = require('debug')('tiny-project-backend:database');

const defaultProtocol = 'mongodb';

/**
 * @param {String} uri
 * @param {ConnectOptions} options
 *
 * @returns {DatabaseConnectionDTO}
 */
const databaseConnectionDTOFactory = (uri, options) => {
  const defaultOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  return {
    uri,
    options: { ...defaultOptions, ...options },
  };
};

/**
 * @param {DatabaseConfiguration} config
 *
 * @returns {DatabaseConnectionDTO}
 */
const createConnection = (config) => {
  const defaultConfig = {
    name: '',
    pass: '',
    user: '',
  };
  const { name, pass, user } = { ...defaultConfig, ...config };
  if (config.uri !== undefined) {
    return databaseConnectionDTOFactory(config.uri, {
      dbName: name,
      user,
      pass,
    });
  }

  const uri = `${defaultProtocol}://${config.host}:${config.post}`;

  return databaseConnectionDTOFactory(uri, {
    dbName: name,
    pass: pass,
    user: user,
  });
};

/**
 * @param {DatabaseConfiguration} config
 *
 * @returns {Promise<Mongoose>}
 */
module.exports = async (config) => {
  try {
    const { uri, options } = createConnection(config);

    if (uri === `${defaultProtocol}://`) {
      throw Error('No database configuration was set.');
    }
    
    debug('Attempting to connect');
    const connection = await connect(uri, options);
    debug('Successfully connected to database');

    return connection;
  } catch (error) {
    debug('Unable to connect in database');
    if ('message' in error) {
      debug(error);
    }
    console.error(error);
  }
};
