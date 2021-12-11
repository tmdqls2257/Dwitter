import * as userRepository from './auth.js'

let tweets = [
  {
    id: '1',
    text: '드림코더분들 화이팅!',
    createdAt: new Date().toString(),
    userId: '1',
  },
  {
    id: '2',
    text: '안뇽!',
    createdAt: new Date().toString(),
    userId: '1',
  },
]

// 정적으로 유저 네임을 받아오지 않게 하기 위해서 사용하는 함수
export async function getAll() {
  // promise.all을 사용하는 이유
  // 점진적으로 구현해 나가기 위해서 메모리로, 간단한 배열을 이용해서, 구현했어요.
  // 아무리 메모리 구현사항이라 할지라도, 데이터베이스 처럼 동작하도록 만든거라 async로 구현해 두었답니다.
  // 데이터베이스처럼 파일의 데이터를 읽고/쓸때는 꽤 오랜 시간이 걸리므로 무조건! async로 해줘야 해요
  return Promise.all(
    tweets.map(async tweet => {
      // userRepository.findById함수를 이용하여 tweet의 userId를 이용해서
      // userRepository에서 받아온 것이 비동기 임으로 await을 써줍니다.
      // map에서 리턴되는 것은 tweet 자체 아이템이 아니라
      // tweet를 리턴하는 프로미스를 가지고 있고 tweet.map을 하게 되면
      // promise의 배열이 만들어지게 된다.
      const { username, name, url } = await userRepository.findById(
        tweet.userId
      )
      return { ...tweet, username, name, url }
    })
  )
}

export async function getAllByUsername(username) {
  return getAll().then(tweets =>
    tweets.filter(tweet => tweet.username === username)
  )
}

export async function getById(id) {
  const found = tweets.find(tweet => tweet.id === id)
  if (!found) {
    return null
  }
  const { username, name, url } = await userRepository.findById(found.userId)
  return { ...found, username, name, url }
}

export async function create(text, userId) {
  const tweet = {
    id: new Date().toString(),
    text,
    createdAt: new Date(),
    userId,
  }
  tweets = [tweet, ...tweets]
  return getById(tweet.id)
}

export async function update(id, text) {
  const tweet = tweets.find(tweet => tweet.id === id)
  if (tweet) {
    tweet.text = text
  }
  return getById(tweet.id)
}

export async function remove(id) {
  tweets = tweets.filter(tweet => tweet.id !== id)
}
