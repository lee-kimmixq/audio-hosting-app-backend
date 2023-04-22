export const Error = {
  INVALID_LOGIN: {
    httpCode: 401,
    code: 'AHA-INVALID-LOGIN',
    message: 'Wrong username or password',
  },
  SIGNUP_INVALID_PASSWORD: {
    httpCode: 400,
    code: 'AHA-SIGNUP-INVALID-PASSWORD',
    message: 'Passwords do not match',
  },
  TOKEN_NOT_FOUND: {
    httpCode: 401,
    code: 'AHA-TOKEN-NOT-FOUND',
    message: 'Access token not found',
  },
  INVALID_TOKEN: {
    httpCode: 401,
    code: 'AHA-INVALID-TOKEN',
    message: 'Invalid access token',
  },
  USERNAME_ALREADY_EXISTS: {
    httpCode: 400,
    code: 'AHA-USERNAME-ALREADY-EXISTS',
    message: 'Username already exists',
  },
  INVALID_OPERATION: {
    httpCode: 400,
    code: 'AHA-INVALID-OPERATION',
    message: 'Invalid operation',
  },
}
