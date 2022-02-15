export default class AuthService {
  constructor(http) {
    this.http = http
  }

  async signup(username, password, name, email, url) {
    return this.http.fetch('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
        name,
        email,
        url,
      }),
    })
  }

  async login(username, password) {
    return this.http.fetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    })
  }

  async me() {
    return this.http.fetch('/auth/me', {
      method: 'GET',
    })
  }

  async logout() {
    // 서버에 전달할 필요없이 클라이언트에서 토큰을 지워주면 됩니다.
    return this.http.fetch('/auth/logout', {
      method: 'POST',
    })
  }
}
