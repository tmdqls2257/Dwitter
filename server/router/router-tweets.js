import 'express-async-errors'
import express from 'express'
import * as tweetController from '../controller/app.js'

const router = express.Router()

// GET /tweets
// GET /tweets?username=:username
router.get('/', tweetController.getTweets)
// GET /tweets/:id
router.get('/:id', tweetController.getTweetsUserId)
// POST /tweets
router.post('/', tweetController.postTweets)
// PUT /tweets/:id
router.put('/:id', tweetController.putId)
// DELETE /tweets/:id
router.delete('/:id', tweetController.deleteId)

export default router
