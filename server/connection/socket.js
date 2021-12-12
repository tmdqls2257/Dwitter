import { Server } from 'socket.io'
import jwt from 'jsonwebtoken'
import { config } from '../config.js'

class Socket {
  constructor(server) {
    this.io = new Server(server, {
      // 모든 port에 대해서 cors 허용
      cors: {
        origin: '*',
      },
    })
    // use http에서와 마찬가지로 들어오는 모든 패킷을 선택적으로 수신하고 미들웨어를 실행
    this.io.use((socket, next) => {
      const token = socket.handshake.query.auth.token
      if (!token) {
        return next(new Error('Authentication error'))
      }
      jwt.verify(token, config.jwt.secretKey, (error, decoded) => {
        if (error) {
          return next(new Error('Authentication error'))
        }
        next()
      })
    })

    this.io.on('connection', socket => {
      console.log('Socket client connected')
    })
  }
}

let socket
export function initSocket(server) {
  if (!socket) {
    socket = new Socket(server)
  }
}
export function getSocketIO() {
  if (!socket) {
    throw new Error('Please call init first')
  }
  return socket.io
}
