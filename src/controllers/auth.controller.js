const userRepository = require('../repositories/user-repository');
const authRepository = require('../repositories/auth-repository');
const jwtUserResource = require('../resources/jwt-user-resource');

/**
 * Login a user and response a JWT Token.
 *
 * @param {Request} request
 * @param {Response} response
 */
exports.login = async (request, response) => {
  const { email, password } = request.body;

  if (email === undefined || password === undefined) {
    response.status(400).json({
      error: 'Please input email or password'
    });

    return;
  }

  try {
    const user = await userRepository.findByCredentials(email, password);
    if (user === null) {
      response.status(400).json({
        error: 'Invalid credentials'
      });

      return;
    }

    const accessToken = authRepository.createAccessToken(jwtUserResource(user));

    response.status(200).json({ accessToken });
  } catch (error) {
    console.error(error);
    response.status(400).json({
      error: 'Something went wrong'
    });
  }
};

/**
 * @param {Response} response
 * @param {String|undefined} error
 */
const unauthorizedResponse = (response, error) => {
  error = error !== undefined ? error : 'Unauthorized';

  response.status(401).json({
    error
  });
};

/**
 * Get profile information using JWT
 *
 * @param {Request} request
 * @param {Response} response
 */
exports.profile = (request, response) => {
  const { headers } = request;

  if (headers.authorization === undefined || headers.authorization === '') {
    unauthorizedResponse(response);

    return;
  }

  const authorization = headers.authorization.split(' ');
  const user = authRepository.decodeToken(authorization[1]);

  if (user === null) {
    unauthorizedResponse(response);

    return;
  }

  response.status(200).json(user);
};
