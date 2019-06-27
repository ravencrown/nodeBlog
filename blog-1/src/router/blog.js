const { getList, getDetail, addBlog, updateBlog, delBlog } = require("../controller/blog")
const { SuccessModel, ErrorModel } = require('../model/resModel')

// 统一的登录验证函数
const loginCheck = (req) => {
    if (!req.session.username) {
        return Promise.resolve(
            new ErrorModel('尚未登录')
        )
    }
}


const handleBlogRouter = (req, res) => {
    const method = req.method
    const id = req.query.id

    // 这是获取博客列表的接口
    if (method === 'GET' && req.path === '/api/blog/list') {
        let author = req.query.author || ''
        const keyword = req.query.keyword || ''

        if (req.query.isadmin) {
            // 管理员界面
            const loginCheckResult = loginCheck(req)
            if (loginCheckResult) {
                // 未登录
                return loginCheckResult
            }
            
            // 强制查询自己的博客
            author = req.session.username
        }
        
        const result = getList(author, keyword)
        return result.then(listData => {
            return new SuccessModel(listData)
        })
    }

    // 这是获取博客x详情的接口
    if (method === 'GET' && req.path === '/api/blog/detail') {
        // const id = req.query.id
        // const detailData = getDetail(id);
        // return new SuccessModel(detailData)
        const result = getDetail(id)
        return result.then(data => {
            return new SuccessModel(data)
        })
    }

    // 新建博客
    if (method === 'POST' && req.path === '/api/blog/new') {
        // const data = addBlog(req.body)
        // return new SuccessModel(data)
        // const author = 'chengx'
        
        const loginCheckResult = loginCheck(req)
        if (loginCheckResult) {
            // 未登录
            return loginCheckResult
        }

        req.body.author = req.session.username
        const result = addBlog(req.body)
        return result.then(data => {
            return new SuccessModel(data)
        })
    }

    // 更新博客
    if (method === 'POST' && req.path === '/api/blog/update') {
        const loginCheckResult = loginCheck(req)
        if (loginCheckResult) {
            // 未登录
            return loginCheckResult
        }

        const result = updateBlog(id, req.body)
        return result.then(val => {
            if (val) {
                return new SuccessModel()
            } else {
                return new ErrorModel('更新失败')
            }
        })
        
    }

    // 删除博客
    if (method === 'POST' && req.path === '/api/blog/del') {
        const loginCheckResult = loginCheck(req)
        if (loginCheckResult) {
            // 未登录
            return loginCheckResult
        }

        const author = req.session.username
        const result = delBlog(id, author)      
        return result.then(val => {
            if (val) {
                return new SuccessModel()
            } else {
                return new ErrorModel('删除失败')
            }
        })
    }
}

module.exports = handleBlogRouter