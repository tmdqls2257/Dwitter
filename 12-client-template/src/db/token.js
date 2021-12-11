const TOKEN = 'token'

export default class tokenStorage {
  saveToken(token) {
    // 브라우저에서 이용 가능한 api를 이용하여줍니다.
    localStorage.setItem(TOKEN, token)
  }

  getToken() {
    return localStorage.getItem(TOKEN)
  }

  clearToken() {
    localStorage.clear(TOKEN)
  }
}
