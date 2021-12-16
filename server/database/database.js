import Mongoose from 'mongoose'
import { config } from '../config.js'

let db
export async function connectDB() {
  return Mongoose.connect(config.db.host)
}

export function userVirtualId(schema) {
  // 가상의 아이디를 읽어온다.
  schema.virtual('id').get(function () {
    return this._id.toString()
  })

  // virtuals :true를 해줘야 정보가 JSON형태로 추가가된다.
  schema.set('toJSON', { virtuals: true })

  schema.set('toObject', { virtuals: true })
}

export function getUsers() {
  return db.collection('users')
}

export function getTweets() {
  return db.collection('tweet')
}
