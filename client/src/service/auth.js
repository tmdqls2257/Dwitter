export default class AuthService {
  constructor(http, tokenStorage) {
    this.http = http
    this.tokenStorage = tokenStorage
  }

  async signup(username, password, name, email, url) {
    const data = await this.http.fetch('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
        name,
        email,
        url,
      }),
    })
    //data에 있는 토큰을 저장해 줍니다.
    this.tokenStorage.saveToken(data.token)
    return data
  }

  async login(username, password) {
    const data = await this.http.fetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    })
    //data에 있는 토큰을 저장해 줍니다.
    this.tokenStorage.saveToken(data.token)
    return data
  }

  async me() {
    // 토큰을 읽어옵니다.
    const token = this.tokenStorage.getToken()
    return this.http.fetch('/auth/me', {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    })
  }

  async logout() {
    // 서버에 전달할 필요없이 클라이언트에서 토큰을 지워주면 됩니다.
    this.tokenStorage.clearToken()
  }
}
