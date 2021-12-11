import express from 'express'
import 'express-async-errors'
import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'
import tweetsRouter from './router/tweets.js'
import authRouter from './router/auth.js'
// process를 호출하기 위해 해줘야함
import dotenv from 'dotenv'
import { config } from './config.js'
dotenv.config()

const app = express()

app.use(express.json())
app.use(helmet())
app.use(cors())
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
app.listen(config.host.port)

// npm i dotenv를 설치하여 env처럼 사용하기
