const { exec } = require('../db/mysql')

const getList = (author, keyword) => {
    // 1=1 的作用是占位，防止 author 和 keyword 没值的时候
    let sql = `select * from blogs where 1=1 `
    if (author) {
        sql += `and author='${author}' `
    }
    if (keyword) {
        sql += `and title like '%${keyword}%' `
    }
    
    sql += `order by createTime desc;`
    return exec(sql)
}

const getDetail = (id) => {
    let sql = `select * from blogs where id='${id}'`
    return exec(sql).then(rows => {
        return rows[0]
    })
}

const addBlog = ((blogData = {}) => {
    // blogData 博客对象， 包含title,content等属性
    // return {
    //     id: 3,  // 新建博客插入到数据库的id
    // }

    const title = blogData.title
    const content = blogData.content
    const author = blogData.author
    const createTime = Date.now()

    const sql = `
        insert into blogs (title, content, createTime, author)
        values ('${title}', '${content}', '${createTime}', '${author}');
    `
    return exec(sql).then(insertData => {
        return {
            id: insertData.insertId
        }
    })
}) 

const updateBlog = (id, blogData = {}) => {
    // id 是要更新博客的id
    const title = blogData.title
    const content = blogData.content

    const sql = `
        update blogs set title='${title}', content='${content}' where id=${id};
    `
    return exec(sql).then(updateData => {
        if (updateData.affectedRows > 0) {
            return true
        }
        return false
    })
}

const delBlog = (id, author) => {
    const sql = `delete from blogs where id='${id}' and author='${author}';`
    return exec(sql).then(delData => {
        if (delData.affectedRows > 0) {
            return true
        }
        return false
    })
}

module.exports = {
    getList,
    getDetail,
    addBlog,
    updateBlog,
    delBlog
}