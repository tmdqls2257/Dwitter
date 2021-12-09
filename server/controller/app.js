import * as tweetRepository from '../data/data-tweet.js'

export async function getTweets(req, res, next) {
  const username = req.query.username
  const data = await (username
    ? tweetRepository.getAllTweetsByUsername(username)
    : tweetRepository.getAllTweets())
  res.status(200).json(data)
}

export async function getTweetsUserId(req, res, next) {
  const userId = req.params.id
  const data = await tweetRepository.getTweetById(userId)
  if (data) {
    res.status(200).json(data)
  } else {
    res.status(404).json({ message: `트윗 ${userId}를 찾지 못했습니다.` })
  }
}

export async function postTweets(req, res, next) {
  console.log(req.body.text)
  const { text, name, username } = req.body
  const tweet = await tweetRepository.createTweet(text, name, username)
  // 사용자에게는 온전한 정보를 전해줘야한다.
  res.status(201).json(tweet)
}

export async function putId(req, res, next) {
  const id = req.params.id
  const text = req.body.text
  const tweet = await tweetRepository.updateTweet(id, text)
  if (tweet) {
    res.status(200).json(tweet)
  } else {
    res.status(404).json
  }
}

export async function deleteId(req, res, next) {
  const id = req.params.id
  await tweetRepository.deleteTweet(id)
  res.sendStatus(204)
}
