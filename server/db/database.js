import mysql from 'mysql2'
import { config } from '../config.js'
import SQ from 'sequelize'

const { host, user, database, password, port } = config.db
export const sequelize = new SQ.Sequelize(database, user, password, {
  host,
  dialect: 'mysql',
  logging: false,
  port,
})
// 예민한 정보가 찍히기 때문에 env에 정보를 넘겨야함
// mysql에 접속
const pool = mysql.createPool({
  host: host,
  user: user,
  database: database,
  password: password,
  port: port,
})

// 어플리케이션이 비동기적으로 작동하게 한다.
export const db = pool.promise()
