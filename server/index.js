const userApi = require('./api/userApi')
const companyApi = require('./api/companyApi')
const login = require('./api/login')
const fs = require('fs')
const path = require('path')
const bodyParser = require('body-parser')
const express = require('express')
const cors = require('cors')
const app = express()
const Fn = require('./utils')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// 处理CORB
app.use(cors({
  allowedHeaders: ['Content-Type', 'token'],
  exposedHeaders: ['token'],
  origin: '*',
  methods: 'GET,POST,PUT,DELETE,PATCH,OPTIONS',
  prefilghtContinue: false
}))

// 处理跨域
// app.use(function(req, res, next) {
//   // 允许链接的网站
//   res.setHeader('Access-Control-Allow-Origin', '*')
//   // 允许的请求方式
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT, PATCH, OPTIONS')
//   // 允许的请求头
//   res.setHeader('Access-Control-Allow-Headers', 'x-requested-with, Content-Type, token')
//   // 如果需要网站在发送到API的请求中包含cookie（例如，在使用会话的情况下），请设置为true。
//   res.setHeader('Access-Control-Allow-Credentials', true)
//   res.setHeader('Content-Type', 'applicaition/jsoncharset=UTF-8')
//   // 对登录用户执行session校验
//   console.log('req----')
//   if (req.headers.token) {
//     next()
//   } else {
//     // 判断请求是否为 登录，注册，登出，如果是不做token验证
//     const arr = req.url.split('/')
//     console.log(arr)
//     if (['login', 'logout', 'register'].includes(arr[arr.length - 1])) {
//       console.log('登录成功')
//       next()
//     } else {
//       console.log('没有token')
//       const data = {
//         code: '401',
//         message: '用户登录状态失效'
//       }
//       res.json(data)
//     }
//   }
// })

app.all('*', function(req, res, next) { // 处理跨域
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'x-requested-with, Content-Type, token')
  res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT, PATCH, OPTIONS')
  res.header('Content-Type', 'applicaition/json;charset=UTF-8')
  if (req.headers.token) {
    next()
  } else {
    // 判断请求是否为 登录，注册，登出，如果是不做token验证
    const arr = req.url.split('/')
    console.log(arr)
    if (['login', 'logout', 'register'].includes(arr[arr.length - 1])) {
      console.log('登录成功')
      next()
    } else {
      console.log('没有token')
      const data = {
        code: '401',
        message: '用户登录状态失效'
      }
      res.json(data)
    }
  }
  // next()
})
app.use('/api/user', userApi)
app.use('/api/company', companyApi)
app.use('/api/login', login)

// 创建websocket连接
const WebSocket = require('ws')
const { json } = require('body-parser')
const server = new WebSocket.Server({ port: 6666 }, () => {
  console.log('socket start')
})
server.on('open', () => {
  console.log('connected')
})
server.on('close', (e) => {
  console.log('disconnected')
  console.log(e)
})
server.on('message', (msg) => {
  console.log('------msg----')
  console.log(msg)
})
const clients = [] // 所有建立的连接，消息推送
server.on('connection', (client, data) => {
  clients.push(client)
  console.log('在线人数：', clients.length)
  const hasMsg = JSON.parse(fs.readFileSync('msg.json'))
  // console.log(hasMsg)
  // // 发送信息给客户端
  client.send(JSON.stringify(hasMsg.message))
  // 监听客户端发送的信息
  client.on('message', (message) => {
    console.log(message)
    const news = JSON.parse(message)
    news.time = Fn.getTime()
    console.log(news)
    hasMsg.message.push(news)
    fs.writeFile('./msg.json', JSON.stringify(hasMsg), (err) => {
      if (err) {
        console.log(err)
      } else {
        console.log('--修改成功--')
      }
    })
    // 将信息广播发送到各连接状态的客户端
    clients.forEach(item => {
      item.send(JSON.stringify(news))
    })
  })
  // 监听关闭
  client.on('close', (e) => {
    console.log('disconnected')
    console.log(e)
  })
}).on('error', (err) => {
  console.log(err)
})

app.listen(3000)
console.log('success listen at port:3000')
// module.exports = app

