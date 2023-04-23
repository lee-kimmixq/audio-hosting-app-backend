import dotenv from 'dotenv'

dotenv.config()

const missingVariables: string[] = []

const required = (variable: string) => {
  const value = process.env[variable]
  if (!value) {
    missingVariables.push(variable)
  }
  return value
}

export const {
  FRONTEND_URL = required('FRONTEND_URL'),
  PORT = '3000',
  HOST = '127.0.0.1',
  POSTGRES_USER = required('POSTGRES_USER'),
  POSTGRES_PASSWORD = required('POSTGRES_PASSWORD'),
  POSTGRES_DB = required('POSTGRES_DB'),
  SALT = required('SALT'),
  JWT_TOKEN_KEY = required('JWT_TOKEN_KEY'),
  AWS_ACCESS_KEY_ID = required('AWS_ACCESS_KEY_ID'),
  AWS_SECRET_ACCESS_KEY = required('AWS_SECRET_ACCESS_KEY'),
  AWS_DEFAULT_REGION = required('AWS_DEFAULT_REGION'),
  AWS_BUCKET_NAME = required('AWS_BUCKET_NAME'),
  AWS_S3_ENDPOINT = required('AWS_S3_ENDPOINT'),
} = process.env

if (missingVariables.length) {
  throw new Error(`Missing environment variables: ${missingVariables}`)
}
