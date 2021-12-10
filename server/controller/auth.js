import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import {} from 'express-async-errors'
import * as userRepository from '../data/auth.js'

// 비밀번호 만들기
const secret = 'fSTWh2471^%Vw9dmUyYR$BXL*VJhq&N&'
const jwtExpireinDays = '2d'
const bcryptSaltRounds = 12

export async function signup(req, res, next) {
  const { username, password, name, email, url } = req.body
  // 유저의 이름을 받아온다.
  const found = await userRepository.findByUsername(username)
  // 유저가 있다면 409에러를 주게된다.
  if (found) {
    return res.status(409).json({ message: `${username} already exists` })
  }
  // bcrypt를 이용해 비밀 번호를 암호화 한다.
  const hashed = await bcrypt.hash(password, bcryptSaltRounds)
  // 유저를 만들어준다.
  // 이때 암호화된 비밀번호를 넘겨준다.
  const userId = await userRepository.createUser({
    username,
    password: hashed,
    name,
    email,
    url,
  })
  // 토큰을 만들어준다.
  const token = createJwtToken(userId)
  console.log(1)
  console.log(token)
  res.status(200).json({ token, username })
}

// 토큰을 만들어주는 함수
function createJwtToken(id) {
  return jwt.sign({ id }, secret, { expiresIn: jwtExpireinDays })
}

export async function login(req, res) {
  // 요청에서 username과 password를 받아온다.
  const { username, password } = req.body
  const user = await userRepository.findByUsername(username)
  if (!user) {
    return res.status(401).json({ message: 'Invalid user or password' })
  }
  const isValidPassword = await bcrypt.compare(password, user.password)
  if (!isValidPassword) {
    return res.status(401).json({ message: 'Invalid user or password' })
  }
  const token = createJwtToken(user.id)

  setTimeout(() => {
    jwt.verify(token, secret, (error, decoded) => {
      console.log(error, decoded)
    })
  }, 1000)
  console.log(2)
  console.log(token)
  res.status(200).json({ token, username })
}

export async function me(req, res, next) {
  // request에서 받아온 username이 존재하는지 아닌지 판별한다.
  const user = await userRepository.findById(req.username)
  // 존재하지 않는다면 404에러를 보내준다.
  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }
  res.status(200).json({ token: req.token, username: user.username })
}
