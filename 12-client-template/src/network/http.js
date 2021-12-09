export default class HttpClient {
  constructor(baseURL) {
    this.baseURL = baseURL
  }
  async fetch(url, options) {
    //   this.fetch는 class내의 fetch함수를 의미한다.
    const response = await fetch(`${this.baseURL}${url}`, {
      // 사용자가 원하는 옵션
      ...options,
      headers: {
        'Content-Type': 'application/json',
        // 사용자가 원하는 옵션에 header가 있다면 추가하는 기능
        ...options.headers,
      },
    })
    let data
    //body가 없는 response에 json을 추출하면 에러가 발생하므로 try catch를 사용함
    try {
      data = await response.json()
    } catch (err) {
      console.error(err)
    }
    // fetch API는 status가 200이 아닌 경우에도 데이타가 오는 경우도 있기 때문에 추가적인 확인이 필요함
    if (response.status > 299 || response.status < 200) {
      // 데이타가 있고 그 데이타에 message가 존재한다면 message를 사용하고 없다면
      const message =
        data && data.message ? data.message : 'Something went wrong!'
      throw new Error(message)
    }
    return data
  }
}
