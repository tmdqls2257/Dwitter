import { db } from '../db/database.js'

// 트윗에 있는 userId와 userId가 같다면 tweets와 users테이블에서 유저의 정보를 가져옵니다.
const SELECT_JOIN =
  'SELECT tw.id, tw.text, tw.createdAt, tw.userId, us.username, us.name, us.url FROM tweets as tw JOIN users as us ON tw.userId=us.id'
// 최신것 부터 받아와야하기 때문에 ORDER BY tw.createAt DESC를 해줍니다.
const ORDER_DESC = 'ORDER BY tw.createdAt DESC'

// 정적으로 유저 네임을 받아오지 않게 하기 위해서 사용하는 함수
export async function getAll() {
  return db
    .execute(`${SELECT_JOIN} ${ORDER_DESC}`) //
    .then(result => result[0])
}

export async function getAllByUsername(username) {
  return db
    .execute(`${SELECT_JOIN} WHERE username=? ${ORDER_DESC}`, [username]) //
    .then(result => result[0])
}

// 배열에 등록된 아이디가 tweet에 있는지 없는지 검사
// 있으면 리턴
export async function getById(id) {
  return db
    .execute(`${SELECT_JOIN} WHERE tw.id=?`, [id])
    .then(result => result[0][0])
}

// 트윗을 만들어주는 함수
export async function create(text, userId) {
  return db
    .execute('INSERT INTO tweets (text, createdAt, userId) VALUES(?,?,?)', [
      text,
      new Date(),
      userId,
    ])
    .then(result => getById(result[0].insertId))
}

// 트윗을 수정해주는 함수
export async function update(id, text) {
  return db
    .execute('UPDATE tweets SET text=? WHERE id=?', [text, id])
    .then(() => getById(id))
}

// 트윗을 지워주는 함수
export async function remove(id) {
  return db.execute('DELETE FROM tweets WHERE id=?', [id])
}
