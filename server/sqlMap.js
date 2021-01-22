var sqlMap = {
  user: {
    add: 'insert into user(name, age, description) values(?, ?, ?)',
    delete: 'delete from user where id=?',
    queryAll: 'select * from user'
  },
  login: {
    login: 'select * from user where account = ?'
  }
}
module.exports = sqlMap
