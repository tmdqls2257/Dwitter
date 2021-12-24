import express from 'express'
import {} from 'express-async-errors'
import { body } from 'express-validator'
import { validate } from '../middleware/validator.js'
import * as authController from '../controller/auth.js'
import { isAuth } from '../middleware/auth.js'

const router = express.Router()

const validateCredential = [
  body('username')
    .trim()
    .notEmpty()
    .withMessage('username should be at least 5 characters'),
  body('password')
    .trim()
    .isLength({ min: 5 })
    .withMessage('password should be at least 5 characters'),
  // 에러가 없으면 상관없지만 있다면 에러가 있다면 에러를 내보냄
  validate,
]

// signup에 대한 유효성 검사
const validateSignup = [
  ...validateCredential,
  body('name').notEmpty().withMessage('name is missing'),
  body('email').isEmail().normalizeEmail().withMessage('invalid email'),
  body('url')
    .isURL()
    .withMessage('invalid URL')
    .optional({ nullable: true, checkFalsy: true }),
  validate,
]
router.post('/signup', validateSignup, authController.signup)

router.post('/login', validateCredential, authController.login)
// GET auth/me
// 로그인한 다음 사용하는 함수임으로
// token은 유효한지 유저는 올바른지를 검사해야한다.
router.get('/me', isAuth, authController.me)

export default router
