import SQ from 'sequelize'
import { db, sequelize } from '../db/database.js'
import { User } from './auth.js'
const DataTypes = SQ.DataTypes
const Sequelize = SQ.Sequelize

const Tweet = sequelize.define('tweet', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  text: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
})
// 트윗은 사용자에게 존속된다.
Tweet.belongsTo(User)

const INCLUDE_USER = {
  // "text": "New Message",
  // "createdAt": "2021-12-13T16:12:11.000Z",
  // "userId": 1,
  // "name": "Redbeen",
  // "username": "appplecock",
  // "url": "https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-1.png"
  // 형태로 가져오기 위한 기능
  attributes: [
    'id',
    'text',
    'createdAt',
    'userId',
    // collum안에 있는 user.name을 중첩된 형태가 아닌 name으로 가져온다.
    [Sequelize.col('user.name'), 'name'],
    [Sequelize.col('user.username'), 'username'],
    [Sequelize.col('user.url'), 'url'],
  ],
  include: {
    model: User,
    attributes: [],
  },
}

const ORDER_DESC = {
  order: [['createdAt', 'DESC']],
}

// 정적으로 유저 네임을 받아오지 않게 하기 위해서 사용하는 함수
export async function getAll() {
  return Tweet.findAll({ ...INCLUDE_USER, ...ORDER_DESC })
}

export async function getAllByUsername(username) {
  return Tweet.findAll({
    ...INCLUDE_USER,
    ...ORDER_DESC,
    include: {
      ...INCLUDE_USER.include,
      where: { username },
    },
  })
}

// 배열에 등록된 아이디가 tweet에 있는지 없는지 검사
// 있으면 리턴
export async function getById(id) {
  return Tweet.findOne({
    where: { id },
    ...INCLUDE_USER,
  })
}

// 트윗을 만들어주는 함수
export async function create(text, userId) {
  return Tweet.create({ text, userId }) //
    .then(data => this.getById(data.dataValues.id))
}

// 트윗을 수정해주는 함수
export async function update(id, text) {
  return Tweet.findByPk(id, INCLUDE_USER) //
    .then(tweet => {
      tweet.text = text
      return tweet.save()
    })
}

// 트윗을 지워주는 함수
export async function remove(id) {
  return Tweet.findByPk(id) //
    .then(tweet => {
      tweet.destroy()
    })
}
