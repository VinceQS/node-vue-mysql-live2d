var conf = require('../db')
var express = require('express')
var router = express.Router()
var mysql = require('mysql')
var $sql = require('../sqlMap')
var jwt = require('jsonwebtoken')

// 使用连接池，提升性能
// var pool  = mysql.createPool($util.extend({}, $conf.mysql))
var pool = mysql.createPool(conf.mysql)

// 根据token获取用户信息
router.get('/getUserInfo', (req, res, next) => {
  jwt.verify(req.headers.token, 'beijing', (err, decode) => {
    if (err) {
      console.log('err:', err)
      const data = {
        code: '401',
        message: '用户登录状态失效'
      }
      res.json(data)
    } else {
      const sql = $sql.login.login
      console.log('----解码token----')
      const account = jwt.decode(req.headers.token).account
      console.log(account)
      pool.getConnection((err, connection) => {
        if (err) {
          console.log(err)
          res.json({ code: '1', message: '系统异常' })
        } else {
          connection.query(sql, [account], (error, result) => {
            if (error) {
              console.log('查询用户信息异常', error)
            } else if (result) {
              if (result.length === 1) {
                const data = {
                  code: '000000',
                  message: 'success',
                  userInfo: result[0]
                }
                res.json(data)
              } else {
                res.json({ code: '1', message: '系统异常' })
              }
            }
          })
        }
      })
    }
  })
})
// 验证密码
router.post('/login', (req, res, next) => {
  const sql = $sql.login.login
  const account = req.body.user
  const password = req.body.password
  pool.getConnection((err, connection) => {
    if (err) {
      console.log(err)
    } else {
      connection.query(sql, [account], (error, result) => {
        if (error) {
          console.log('登录异常', error)
        }
        if (result) {
          console.log('-----')
          console.log(result)
          if (result.length) {
            const pwd = result[0].password
            const data = {
              code: '000000',
              statusText: pwd === password ? 'success' : 'error',
              status: 200,
              message: pwd === password ? '登录成功' : '密码错误'
            }
            if (pwd === password) {
              const token = jwt.sign({ account, exp: Math.floor(Date.now() / 1000 + (60 * 100)) }, 'beijing')
              console.log('token:', token)
              data.token = token
              data.userInfo = result[0]
              // data.userInfo = JSON.parse(JSON.stringify(result[0]))
            }
            console.log(data)
            res.json(data)
          } else {
            const data = {
              code: '000000',
              statusText: 'error',
              status: 200,
              message: '账号不存在'
            }
            res.json(data)
          }
        }
      })
      pool.releaseConnection(connection)
    }
  })
})
module.exports = router
