const TOKEN = 'token'

export default class tokenStorage {
  saveToken(token) {
    // setItem : 전달해준 첫번째 인자의 키가 없을 경우 첫번째 인자를 키로 두번째를 값으로 생성해줍니다.
    localStorage.setItem(TOKEN, token)
  }

  getToken() {
    // 지정된 키와 연결된 현재 값을 반환하거나, 지정된 키가 없으면 null을 반환합니다.
    return localStorage.getItem(TOKEN)
  }

  clearToken() {
    // 키에 대한 값이 있다면 키와 값 모두 지워줍니다.
    localStorage.clear(TOKEN)
  }
}
