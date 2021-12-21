const { env } = require('process');

module.exports = {
  appPort: env.PORT || 3000,
  appDebug: env.APP_DEBUG || false,
  database: {
    uri: env.DB_URI,
    user: env.DB_USERNAME,
    pass: env.DB_PASSWORD,
    host: env.DB_HOST,
    name: env.DB_NAME
  },
  auth: {
    jwtSecretKey: env.JWT_SECRET_KEY,
    saltOrRounds: env.AUTH_SALT_OR_ROUNDS || 10
  },
  test: {
    databaseOptions: {
      binary: {
        version: '4.0.3',
        skipMD5: true
      },
      autoStart: false,
      instance: {}
    }
  }
};
