import 'express-async-errors'
import express from 'express'

const router = express.Router()

// DB가 있다고 가정
let tweets = [
  {
    id: '1',
    text: '애플콕 힘내자',
    createAt: Date.now().toString(),
    name: 'Bob',
    username: 'bob',
    url: 'https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-1.png',
  },
]
// GET /tweets
// GET /tweets?username=:username
router.get('/', (req, res, next) => {
  const username = req.query.username
  const data = username
    ? tweets.filter(data => data.username === username)
    : tweets
  res.status(200).json(data)
})
// GET /tweets/:id
router.get('/:id', (req, res, next) => {
  const userId = req.params.id
  const data = tweets.find(data => data.userId === userId)
  if (data) {
    res.status(200).json(data)
  } else {
    res.status(404).json({ message: `트윗 ${userId}를 찾지 못했습니다.` })
  }
})
// POST /tweets
router.post('/', (req, res, next) => {
  console.log(req.body.text)
  const { text, name, username } = req.body
  const tweet = {
    id: Date.now().toString(),
    text,
    createAt: new Date(),
    name,
    username,
  }
  tweets = [tweet, ...tweets]
  // 사용자에게는 온전한 정보를 전해줘야한다.
  res.status(201).json(tweet)
})
// PUT /tweets/:id
router.put('/:id', (req, res, next) => {
  const id = req.params.id
  const text = req.body.text
  const tweet = tweets.find(data => data.id === id)
  if (tweet) {
    tweet.text = text
    res.status(200).json(tweet)
  } else {
    res.status(404).json
  }
})
// DELETE /tweets/:id
router.delete('/:id', (req, res, next) => {
  const id = req.params.id
  tweets = tweets.filter(data => data.id !== id)
  res.sendStatus(204)
})

export default router
