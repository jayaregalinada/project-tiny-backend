const seeder = require("../../utils/seeder")
const UserModel = require('../../models/user');
const factory = require('../factories/user-factory');

module.exports = async (count = 1) => {
  seeder(UserModel, factory, {}, count);
}