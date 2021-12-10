import { validationResult } from 'express-validator'

export const validate = (req, res, next) => {
  // 우리가 등록한 유효성 검사에 문제가 있는지 없는지 결과를 받아오고
  // 에러가 있다면 ERROR를 message로 전달해준다.
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  return res.status(400).json({ message: errors.array()[0].msg })
}
