export default class TweetService {
  // 외부로부터 baseURL을 받아옴
  constructor(http, tokenStorage, socket) {
    this.http = http
    this.tokenStorage = tokenStorage
  }

  async getTweets(username) {
    // 특정한 username을 받아오는 경우
    const query = username ? `?username=:${username}` : ''
    return this.http.fetch(`/tweets${query}`, {
      // 서버에 get 요청을하여 header에 token를 줍니다.
      method: 'GET',
      headers: this.getHeaders(),
    })
  }

  async postTweet(text) {
    return this.http.fetch(`/tweets`, {
      method: 'POST',
      headers: this.getHeaders(),
      // object를 json형태로 넘겨주는 기능
      body: JSON.stringify({ text, username: 'ellie', name: 'Ellie' }),
    })
  }

  async deleteTweet(tweetId) {
    return this.http.fetch(`/tweets/${tweetId}`, {
      headers: this.getHeaders(),
      method: 'DELETE',
    })
  }

  async updateTweet(tweetId, text) {
    return this.http.fetch(`/tweets/${tweetId}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      // body에 받아온 text를 json헝태로 업데이트 해줍니다.
      body: JSON.stringify({ text }),
    })
  }

  getHeaders() {
    const token = this.tokenStorage.getToken()
    return {
      Authorization: `Bearer ${token}`,
    }
  }

  onSync(callback) {
    return this.socket.onSync('tweets', callback)
  }
}
