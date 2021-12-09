export default class TweetService {
  // 외부로부터 baseURL을 받아옴
  constructor(http) {
    this.http = http
  }

  async getTweets(username) {
    // 특정한 username을 받아오는 경우
    const query = username ? `?username=:${username}` : ''
    return this.http.fetch(`/tweets${query}`, {
      // 서버에서 get요청을 했을 경우
      method: 'GET',
    })
  }

  async postTweet(text) {
    return this.http.fetch(`/tweets`, {
      method: 'POST',
      // object를 json형태로 넘겨주는 기능
      body: JSON.stringify({ text, username: 'applecock', name: 'Redbeen' }),
    })
  }

  async deleteTweet(tweetId) {
    return this.http.fetch(`/tweets/${tweetId}`, {
      method: 'DELETE',
    })
  }

  async updateTweet(tweetId, text) {
    return this.http.fetch(`/tweets/${tweetId}`, {
      method: 'PUT',

      body: JSON.stringify({ text }),
    })
  }
}
