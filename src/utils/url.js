const qs = require('qs');

/**
 * @param {Request} request
 *
 * @returns {String}
 */
module.exports = (request, requestQuery) => {
  const { protocol, headers, baseUrl, query } = request;
  const url = `${protocol}://${headers.host}${baseUrl}`;
  const queries = {
    ...query,
    ...requestQuery,
  };
  const queryParse = qs.stringify(queries);

  return `${url}?${queryParse}`;
};
