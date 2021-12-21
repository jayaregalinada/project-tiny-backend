const seeder = require('../../utils/seeder');
const userModel = require('../../models/user');
const factory = require('../factories/user-factory');

module.exports = async (count = 1) => {
  seeder(userModel, factory, {}, count);
};
