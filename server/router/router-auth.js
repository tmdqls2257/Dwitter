import 'express-async-errors'
import express from 'express'
import { body } from 'express-validator'
import * as authController from '../controller/auth.js'
import { validate } from '../middleware/validator.js'
import { isAuth } from '../middleware/mid_auth.js'

const router = express.Router()

// 로그인 유효성 검사
const validateCredential = [
  body('username').trim().notEmpty().withMessage('최소 다섯글자 입려해주세요'),
  body('password')
    .trim()
    .isLength({ min: 5 })
    .withMessage('패스워드의 길이는 5글자 이상이여야합니다.'),
  validate,
]

// signup에 대한 유효성 검사
const validateSignup = [
  ...validateCredential,
  body('name').notEmpty().withMessage('이름을 입력해주세요'),
  body('email').isEmail().normalizeEmail().withMessage('inavalid email'),
  body('url')
    .isURL()
    .withMessage('invalid URL')
    .optional({ nullable: true, checkFalsy: true }),
]

// POST auth/signup
router.post('/signup', validateSignup, authController.signup)

// POST auth/login
router.post('/login', validateCredential, authController.login)
// GET auth/me
// 로그인한 다음 사용하는 함수임으로
// token은 유효한지 유저는 올바른지를 검사해야한다.
router.get('/me', isAuth, authController.me)

export default router
