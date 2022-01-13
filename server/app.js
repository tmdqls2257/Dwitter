import express from 'express'
import 'express-async-errors'
import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import tweetsRouter from './router/tweets.js'
import authRouter from './router/auth.js'
import { config } from './config.js'
import { initSocket } from './connection/socket.js'
import { connectDB } from './database/database.js'

// import { db } from './db/database.js'

const app = express()
const corsOption = {
  origin: config.cors.allowedOrigin,
  optionSuccessStatus: 200,
  // httpOnly 쿠키를 다시받게 하기 위해 정보의 안전성을 위한 설정
  credential: true,
}
app.use(express.json())
app.use(helmet())
app.use(cors(corsOption))
// get, post 호출의 상태를 log로 남겨줍니다.
app.use(morgan('tiny'))
app.use(cookieParser())
app.use('/tweets', tweetsRouter)
app.use('/auth', authRouter)

app.use((req, res, next) => {
  res.sendStatus(404)
})

// 에러 핸들러를 반드시 작성해줘야함
app.use((error, req, res, next) => {
  console.error(error)
  res.sendStatus(500)
})

connectDB()
  .then(() => {
    console.log('init')
    const server = app.listen(config.port)
    initSocket(server)
  })
  .catch(console.error())
