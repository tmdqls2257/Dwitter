import 'express-async-errors'
import express from 'express'
import * as tweetController from '../controller/app.js'
import { body } from 'express-validator'
import { validate } from '../middleware/validator.js'
import { isAuth } from '../middleware/mid_auth.js'

const router = express.Router()

// vaildation
// 데이터베이스에 접근해서 읽고쓰기 전에 데이터가 유용한지 검사를 하는것이 중요
// sanitization하면서 데이터를 일관성있게 보관하기 위해

// GET /tweets
// GET /tweets?username=:username

const validateTweet = [
  body('text')
    .trim()
    .isLength({ min: 3 })
    .withMessage('text should be at least 3 characters'),
  validate,
]
// isAuth는 로그인한 사람만 사용하기 위한 함수
router.get('/', isAuth, tweetController.getTweets)
// GET /tweets/:id
router.get('/:id', isAuth, tweetController.getTweetsUserId)
// POST /tweets
router.post('/', isAuth, validateTweet, tweetController.postTweets)
// PUT /tweets/:id
router.put('/:id', isAuth, validateTweet, tweetController.putId)
// DELETE /tweets/:id
router.delete('/:id', isAuth, validateTweet, tweetController.deleteId)

export default router
