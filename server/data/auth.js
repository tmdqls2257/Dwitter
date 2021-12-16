import { userVirtualId } from '../database/database.js'
import Mongoose from 'mongoose'

const userSchema = new Mongoose.Schema({
  username: { type: String, require: true },
  name: { type: String, require: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  url: String,
})

userVirtualId(userSchema)
const User = Mongoose.model('User', userSchema)

export async function findByUsername(username) {
  // 가상의 아이디를 추가해줬기 때문에 then이 필요없다.
  return User.findOne({ username })
}

export async function findById(id) {
  return User.findById(id)
}

export async function createUser(user) {
  // return User.create(user)
  return new User(user).save().then(data => data.id)
}
