import mysql from 'mysql2'
import { config } from '../config.js'

// 예민한 정보가 찍히기 때문에 env에 정보를 넘겨야함
// mysql에 접속
const pool = mysql.createPool({
  host: config.db.host,
  user: config.db.user,
  database: config.db.databse,
  password: config.db.password,
  port: config.db.port,
})

// 어플리케이션이 비동기적으로 작동하게 한다.
export const db = pool.promise()
