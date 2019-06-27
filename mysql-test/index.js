const mysql = require('mysql')

// 创建连接对象
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
    database: 'nodeBlog'
})

// 连接
con.connect()

// 执行 sql 语句
const sql = 'update users set realname = "nico2" where username = "chengx"'
con.query(sql, (err, result) => {
    if (err) {
        console.error(err)
        return
    }
    console.log(result)
})

con.end()
