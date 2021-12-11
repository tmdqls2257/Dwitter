import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import AuthService from './service/auth'
import TweetService from './service/tweet'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { AuthErrorEventBus } from './context/AuthContext'
import HttpClient from './network/http.js'
import TokenStorage from './db/token.js'

const baseURL = process.env.REACT_APP_BASE_URL
const authErrorEventBus = new AuthErrorEventBus()
const tokenStorage = new TokenStorage()
const httpClient = new HttpClient(baseURL, authErrorEventBus)
// 토큰을 만들어주는 기능
const authService = new AuthService(httpClient, tokenStorage)
// 트윗을 만들어주는 기능
const tweetService = new TweetService(httpClient, tokenStorage)

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
