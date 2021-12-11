import dotenv from 'dotenv'
dotenv.config()

// 환경 변수의 값이 있는지 없는지 확인
function required(key, defaultValue = undefined) {
  // process.env[key]값이 없고 defaultValue로 없으면 undefined
  const value = process.env[key] || defaultValue
  if (value === null) {
    throw new Error(`Key ${key} is undefined`)
  }
  return value
}
export const config = {
  jwt: {
    secretKey: required('JWT_SECRET'),
    expiresInSec: parseInt(required('JWT_EXPIRES_SEC')),
  },
  bcrypt: {
    saltRounds: parseInt(required('BCRYPT_SALT_ROUNDS')),
  },
  host: {
    port: parseInt(required('HOST_PORT', 8080)),
  },
}
