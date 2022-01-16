import { Server } from 'socket.io'
import jwt from 'jsonwebtoken'
import { config } from '../config.js'

class Socket {
  constructor(server) {
    this.io = new Server(server, {
      cors: {
        origin: config.cors.allow,
      },
    })

    // use http에서와 마찬가지로 들어오는 모든 패킷을 선택적으로 수신하고 미들웨어를 실행
    this.io.use((socket, next) => {
      // handshake내의 token을 받아옵니다.
      const token = socket.handshake.auth.token
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
// socket이 false이면 새로운 socket을 만들어준다.
export function initSocket(server) {
  if (!socket) {
    socket = new Socket(server)
  }
}
// 서버에서 만들어준 io를 리턴해줍니다.
export function getSocketIO() {
  if (!socket) {
    throw new Error('Please call init first')
  }
  return socket.io
}
