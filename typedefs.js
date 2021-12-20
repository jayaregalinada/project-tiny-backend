const mongoose = require('mongoose');

/**
 * @typedef {Object} DatabaseConnectionDTO
 *
 * @property {String} uri
 * @property {mongoose.ConnectOptions} options
 */

/**
 * @typedef {Object} DatabaseConfiguration
 *
 * @property {String|null} uri
 * @property {String|null} user
 * @property {String|null} pass
 * @property {String|null} host
 * @property {String|null} name
 */

/**
 * @typedef {Object} UserModel
 *
 * @property {String} id
 * @property {String} firstName
 * @property {String} lastName
 * @property {String} email
 * @property {String} username
 * @property {String} password
 * @property {String} avatar
 * @property {Date} createdAt
 * @property {Date} updatedAt
 */

/**
 * @typedef {Object} UserMongooseModel
 *
 * @property {String} _id
 * @property {String} firstName
 * @property {String} lastName
 * @property {String} email
 * @property {String} username
 * @property {String} password
 * @property {String} avatar
 * @property {Date} createdAt
 * @property {Date} updatedAt
 */

/**
 * @typedef {Object} JWTUserModel
 *
 * @property {String} sub
 * @property {String} firstName
 * @property {String} lastName
 * @property {String} email
 * @property {String} username
 * @property {String} avatar
 * @property {Date} createdAt
 * @property {Date} updatedAt
 */

/**
 * @typedef {Object} UserResource
 *
 * @property {String} id
 * @property {String} firstName
 * @property {String} lastName
 * @property {String} email
 * @property {String} username
 * @property {String} photo
 */
