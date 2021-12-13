import express from 'express'
import 'express-async-errors'
import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'
import tweetsRouter from './router/tweets.js'
import authRouter from './router/auth.js'
import { config } from './config.js'
import { initSocket } from './connection/socket.js'
// import { db } from './db/database.js'

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

// db.getConnection().then().catch(console.error)

const server = app.listen(config.host.port)
initSocket(server)

// npm i dotenv를 설치하여 env처럼 사용하기
// const socketIO = new Server(server, {
//   cors: {
//     origin: '*',
//   },
// })
// 이벤트 베이스이기 때문에 on을 사용해야합니다.
// 누군가가 커넥션을 했다면
// socketIO.on('connection', socket => {
//   console.log('Client is here!')
// 해당하는 카테고리 별로 전달하고자 하는 메시지를 전해줄 수 있다.
// 만약 채팅방 별로 주고 받는 데이터를 그룹지어야 한다면
// 채팅방이 그룹이 될 수 있고, 해당 토픽이 그룹이 될 수 있다.
//   socketIO.emit('dwitter', 'Hello')
// })
