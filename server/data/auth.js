import SQ from 'sequelize'
import { sequelize } from '../db/database.js'
const DataTypes = SQ.DataTypes

export const User = sequelize.define(
  'user',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    url: DataTypes.TEXT,
  },
  { timestamps: false }
)

// 유저이름을 받아와서 저장한 곳에
export async function findByUsername(username) {
  // return users.find(user => user.username === username)
  // users테이블의 username인 것만 가져온다.
  return User.findOne({ where: { username } })
}

// Id가 있는지 없는지 찾는다.
export async function findById(id) {
  return User.findByPk(id)
}

// 유저를 만들어주는 함수
export async function createUser(user) {
  return User.create(user).then(data => {
    return data.dataValues.id
  })
}
