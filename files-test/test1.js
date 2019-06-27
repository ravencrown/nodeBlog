const fs = require('fs')
const path = require('path')

const fileName = path.resolve(__dirname, 'data.txt')

// 读取内容
// fs.readFile(fileName, (err, data) => {
//     if (err) {
//         console.error(err)
//         return 
//     }

//     console.log(data.toString())
// })

// 写文件
// const content = '新写入的内容\n'
// const opt = {
//     flag: 'a',  // 追加写入， 覆盖 'w'
// }

// fs.writeFile(fileName, content, opt, (err) => {
//     if (err) {
//         console.error(err)
//     }
// })

// 判断文件是否存在
fs.exists(fileName, (isExist) => {
    console.log('isExist', isExist)
})