# 설치해야할 파일

## 클라이언트에 설치한 파일

npm i socket.io-client

## 서버에 설치한 파일

```
npm i nodemon
npm i dotenv
npm i cors, morgan, helmet, express, express-async-errors
npm i jsonwebtoken
npm i socket.io
npm i --save sequelize
npm i mongodb
npm i cookie-parser
```

# 프로젝트 목적

트위터의 트윗 기능처럼 실시간으로 다른 유저의 트윗을 받아오고 트윗을 작성할 수 있는 기능을 만들어 본다

# stack

- react
- nodejs
- nodemon
- socket
- mongoose
- express
- jwt
- sequelize

# Server

---

## MVC

디자인 패턴은 MVC패턴을 이용하여 디자인 하였습니다.

## controler/auth.js

bcrypt를 이용하여 비밀번호를 암호화 해주고 jwt에 넣어주어 토큰을 만들어주고 로그인과 관련된 기능을 해줍니다.

## controler/tweet.js

## config.js

jwt 토큰의 비밀 번호가 직접적으로 노출이 되어 있는 것은 매우 문제가 있다.
.env를 활용하여 보안성을 높여주자

process.env를 사용하는 것도 좋지만 만약 내가 정의해주지 않은 process.env.abc를
사용했다고 한다면 어떤 일이 벌어질지 모르기 때문에 config 파일을 만들었습니다.

## Procfile

배포 사이트인 heroku가 다른 명령어를 쓰게 하기 위한 파일
nodemon을 node로 사용하기 위한 만들어 줬습니다.
