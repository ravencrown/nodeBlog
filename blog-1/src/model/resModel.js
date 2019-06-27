class BaseModel {
    constructor(data, message) {
        if (typeof data === 'string') {
            this.message = data
            data = null
            message = null
        }

        if (data) {
            this.data = data
        }

        if (message) {
            this.message = message
        }
    }
}

// Success：数据结构模型，接口调用成功时返回这个
class SuccessModel extends BaseModel {
    constructor(data, message) {
        super(data, message)
        this.errno = 0
    }
}

// Error: 数据结构模型，接口调用失败时返回这个
class ErrorModel extends BaseModel {
    constructor(data, message) {
        super(data, message)
        this.errno = -1
    }
}

module.exports = {
    SuccessModel,
    ErrorModel
}