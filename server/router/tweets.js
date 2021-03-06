import express from 'express'
import 'express-async-errors'
import { body } from 'express-validator'
import * as tweetController from '../controller/tweet.js'
import { isAuth } from '../middleware/auth.js'
import { validate } from '../middleware/validator.js'

const router = express.Router()

const validateTweet = [
  body('text')
    .trim()
    .isLength({ min: 3 })
    .withMessage('text should be at least 3 characters'),
  validate,
]

// vaildation
// 데이터베이스에 접근해서 읽고쓰기 전에 데이터가 유용한지 검사를 하는것이 중요
// sanitization하면서 데이터를 일관성있게 보관하기 위해

// GET /tweet
// GET /tweets?username=:username
router.get('/', isAuth, tweetController.getTweets)

// GET /tweets/:id
router.get('/:id', isAuth, tweetController.getTweet)

// POST /tweeets
router.post('/', isAuth, validateTweet, tweetController.createTweet)

// PUT /tweets/:id
router.put('/:id', isAuth, validateTweet, tweetController.updateTweet)

// DELETE /tweets/:id
router.delete('/:id', isAuth, tweetController.deleteTweet)

export default router
