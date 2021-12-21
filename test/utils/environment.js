const NodeEnvironment = require('jest-environment-node');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { test } = require('../../config');
const bootstrap = require('../../bootstrap');

const debug = require('debug')('tiny-project-backend:test');
const mongo = new MongoMemoryServer(test.databaseOptions);

module.exports = class TinyEnvironment extends NodeEnvironment {
  async setup () {
    debug('Setup Tiny Test Environment');
    bootstrap();

    debug('Attempting to start Database');

    await mongo.start();

    const mongoUri = mongo.getUri();
    this.global.__MONGO_URI__ = mongoUri;
    this.global.process.env.DB_URI = mongoUri;

    await super.setup();
  }

  async teardown () {
    debug('Teardown Tiny Test Environment');

    await mongo.stop();

    await super.teardown();
  }

  runScript (script) {
    return super.runScript(script);
  }
};
