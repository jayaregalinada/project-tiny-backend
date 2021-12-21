const { sign, verify } = require('jsonwebtoken');
const { auth } = require('../../config');

/**
 * Create access token.
 *
 * @param {any} data
 * @param {import('jsonwebtoken').SignOptions} options
 *
 * @returns String
 */
exports.createAccessToken = (data, options) => {
  const { jwtSecretKey } = auth;
  const defaultOptions = {
    expiresIn: '1h'
  };

  return sign(data, jwtSecretKey, {
    ...defaultOptions,
    ...options
  });
};

/**
 * Decode the token to get the data.
 *
 * @param {String} token
 *
 * @returns {import('../../typedefs').JWTUserModel|null}
 */
exports.decodeToken = (token) => {
  const { jwtSecretKey } = auth;

  return verify(token, jwtSecretKey, (error, data) => (error ? null : data));
};
