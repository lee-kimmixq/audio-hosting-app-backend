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
}
