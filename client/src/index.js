import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import AuthService from './service/auth'
import TweetService from './service/tweet'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider, fetchToken } from './context/AuthContext'
import { AuthErrorEventBus } from './context/AuthContext'
import HttpClient from './network/http'

import Socket from './network/socket'

const baseURL = process.env.REACT_APP_BASE_URL

// token에러가 발생할 경우 에러를 공지해 줍니다.
const authErrorEventBus = new AuthErrorEventBus()
// 서버에 요청하기 위한 함수
const httpClient = new HttpClient(baseURL, authErrorEventBus)
// 로그인 로그아웃 회원가입을 하는 기능
const authService = new AuthService(httpClient)
// 메모리상의 토큰을 받아옵니다.
const socketClient = new Socket(baseURL, () => fetchToken())
// 트윗을 만들어주는 기능
const tweetService = new TweetService(httpClient, socketClient)

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider
        authService={authService}
        authErrorEventBus={authErrorEventBus}
      >
        <App tweetService={tweetService} />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)
