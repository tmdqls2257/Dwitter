import express from 'express'
import 'express-async-errors'
import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'
import tweetsRouter from './router/tweets.js'
import authRouter from './router/auth.js'
import { config } from './config.js'
import { initSocket } from './connection/socket.js'
import { sequelize } from './db/database.js'
import cookieParser from 'cookie-parser'
// import { db } from './db/database.js'

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(helmet())
app.use(
  cors({
    origin: config.cors.allow,
    optionsSuccessStatus: 200,
  })
)
app.use(morgan('tiny'))

app.use('/tweets', tweetsRouter)
app.use('/auth', authRouter)

app.use((req, res, next) => {
  res.sendStatus(404)
})

app.use((error, req, res, next) => {
  console.error(error)
  res.sendStatus(500)
})
// 스키마가 테이블로 존재하지 않는다면
// 테이블을 만즐어줍니다.
sequelize.sync().then(client => {
  // console.log(client)
  const server = app.listen(config.port)
  initSocket(server)
})
