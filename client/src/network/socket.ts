import socket from 'socket.io-client'
import { Socket } from 'socket.io-client'
interface ServerToClientEvents {
  tweets: (a: string) => void;
}
interface ClientToServerEvents {
  connection: () => void;
}

export default class socketIo {
  io: Socket<ServerToClientEvents, ClientToServerEvents>
  constructor(baseURL: string, getAccessToken: { (): string | null; (): any }) {
    this.io = socket(baseURL, {
      // 소켓에 있는 auth라는 필드를 이용해서 token을 전달해준다.
      // 중요
      auth: cb => cb({ token: getAccessToken() }),
    })

    this.io.on('connect_error', err => {
      console.log('socket error', err.message)
    })
  }

  // 이벤트로 인한 어떠한 콜백을 하고 싶은지 받아오는 함수
  onSync(event: any, callback: (arg0: any) => any) {
    if (!this.io.connected) {
      this.io.connect()
    }

    this.io.on(event, (message: any) => callback(message))
    return () => this.io.off(event)
  }
}