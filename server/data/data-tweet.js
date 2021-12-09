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
export async function getAllTweets() {
  return tweets
}

export async function getAllTweetsByUsername(username) {
  return tweets.filter(data => data.username === username)
}

export async function getTweetById(userId) {
  return tweets.find(data => data.userId === userId)
}

export async function createTweet(text, name, username) {
  const tweet = {
    id: Date.now().toString(),
    text,
    createAt: new Date(),
    name,
    username,
  }
  tweets = [tweet, ...tweets]
  return tweet
}

export async function updateTweet(id, text) {
  const tweet = tweets.find(tweet => tweet.id === id)
  //
  if (tweet) {
    tweet.text = text
  }
  return tweet
}

export async function deleteTweet(id) {
  tweets = tweets.filter(data => data.id !== id)
}
