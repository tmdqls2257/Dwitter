import jwt from 'jsonwebtoken'
import { config } from '../config.js'
import * as userRepository from '../data/auth.js'

const AUTH_ERROR = { message: 'Authentication Error' }
// 1. cookie가 토큰이 있는지 없는지 판별
// 2. 헤더에 토큰이 있는지 없는지

// 모든 요청에 대해서 header에 authorization이 있는지 판별하고
// 있다면 token이 올바른지
// 사용자가 있는지 없는지를 판별하는 함수
export const isAuth = async (req, res, next) => {
  let token
  // header안에 authorization이라는 키의 값을 받아온다.
  const authHeader = req.get('Authorization')
  if (authHeader && authHeader.startsWith('Bearer ')) {
    // Bearer하고 띄어쓰기 split으로 분리
    token = authHeader.split(' ')[1]
  }

  // 만약 헤더에 토큰이 없다면 쿠키를 체크
  if (!token) {
    token = req.cookies['token']
  }

  if (!token) {
    // authHeader가 없거나 authHeader의 처음이 'Bearer '가 아니면 401
    return res.status(401).json(AUTH_ERROR)
  }

  jwt.verify(token, config.jwt.secretKey, async (error, decoded) => {
    if (error) {
      return res.status(401).json(AUTH_ERROR)
    }
    // 사용자가 있는지 없는 찾아본다.
    const user = await userRepository.findById(decoded.id)
    // 유저가 없다면 401에러를 보내줍니다.
    if (!user) {
      return res.status(401).json(AUTH_ERROR)
    }
    // 해독해서 사용자의 아이디가 판별이 된다면
    // 요청에 userId를 추가해줍니다
    // 다른 콜백함수에서 동일하게 접근해야하는 데이터라면 등록해줄 수 있다.
    req.userId = user.id // req.customData
    req.token = token
    next()
  })
}
