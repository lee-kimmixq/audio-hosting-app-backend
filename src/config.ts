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
} = process.env

if (missingVariables.length) {
  throw new Error(`Missing environment variables: ${missingVariables}`)
}
