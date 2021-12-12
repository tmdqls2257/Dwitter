// abcd1234: $2b$12$G9xf8SFq3oTEgdj7ozHQ/uhDOyeQcUEDU8tnOcvpvApuadr3nE5Vm
let users = [
  {
    id: '1',
    username: 'bob',
    password: '$2b$12$G9xf8SFq3oTEgdj7ozHQ/uhDOyeQcUEDU8tnOcvpvApuadr3nE5Vm',
    name: 'Bob',
    email: 'bob@gmail.com',
    url: 'https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-1.png',
  },
  {
    id: '2',
    username: 'apple',
    password: '$2b$12$G9xf8SFq3oTEgdj7ozHQ/uhDOyeQcUEDU8tnOcvpvApuadr3nE5Vm',
    name: 'cock',
    email: 'bob@gmail.com',
  },
]
// 유저이름을 받아와서 저장한 곳에
export async function findByUsername(username) {
  return users.find(user => user.username === username)
}

// Id가 있는지 없는지 찾는다.
export async function findById(id) {
  return users.find(user => user.id === id)
}

// 유저를 만들어주는 함수
export async function createUser(user) {
  const created = { ...user, id: Date.now().toString() }
  users.push(created)
  return created.id
}
