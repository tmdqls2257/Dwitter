import { db } from '../db/database.js'

// 유저이름을 받아와서 저장한 곳에
export async function findByUsername(username) {
  // return users.find(user => user.username === username)
  // users테이블의 username인 것만 가져온다.
  return db
    .execute('SELECT * FROM users WHERE username=?', [username]) //
    .then(result => result[0][0])
}

// Id가 있는지 없는지 찾는다.
export async function findById(id) {
  return db
    .execute('SELECT * FROM users WHERE id=?', [id]) //
    .then(result => result[0][0])
}

// 유저를 만들어주는 함수
export async function createUser(user) {
  const { username, password, name, email, url } = user
  return db
    .execute(
      'INSERT INTO users (username, password, name, email, url) VALUES (?,?,?,?,?)',
      [username, password, name, email, url]
    )
    .then(result => result[0].insertId)
}
