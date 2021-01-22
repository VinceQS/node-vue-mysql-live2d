const conf = require('../db');
const express = require('express');
const mysql = require('mysql');
const router = express.Router();

const jsonWrite = function(res, ret){
    if(typeof ret === 'undefined'){
        res.json({
            code:1,
            msg:'操作失败'
        })
    }else{
        res.json(ret);
    }
}
// 使用连接池，
var pool = mysql.createPool(conf.mysql);

// 新增公司信息
router.post('/addCompany', (req, res, next) =>{
    let sql = 'insert into company(name,address,manager,phone) values(?, ?, ?, ?)';
    let params = [req.body.name, req.body.address, req.body.manager, req.body.phone];
    pool.getConnection(function(err, connection){
        if(err){
            console.log(err)
        }else{
            connection.query(sql, params, function(error, result){
                if(error){
                    console.log('失败',error)
                }
                if(result){
                    let data = {
                        code:'000000',
                        status:200,
                        msg:'新增成功'
                    }
                    jsonWrite(res, data);
                }
            })
            pool.releaseConnection(connection);
        }
    })
})
// 查询列表
router.get('/getCompany', (req, res, next) =>{
    let name = req.query.name?req.query.name+'%':'%';
    let num = req.query.pageNum;
    let size = Number(req.query.pageSize);
    let start = size*(num-1);
    let sql = 'select count(*) from company where name like ?; select * from company where name like ? limit ?, ?';

    pool.getConnection(function(err, connection){
        if(err){
            console.log(err)
        }else{
            connection.query(sql, ["%" + name + "%","%" + name + "%", start, size],function(error, result){
                if(error){
                    console.log('error',error)
                }
                if(result){
                    let len = result[0][0]['count(*)'];
                    let arr = result[1];
                    const data = {
                        total:len,
                        list:arr,
                        code:'000000',
                        status:200
                    }
                    jsonWrite(res, data)
                }
            })
            pool.releaseConnection(connection);
        }
    })
})

module.exports = router;