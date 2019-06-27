const fs = require('fs')
const path = require('path')

// const fullFileName = path.resolve(__dirname, 'files', 'a.json')

// fs.readFile(fullFileName, (err, data) => {
//     if (err) {
//         console.error(err)
//         return
//     }

//     console.log(data.toString())
// })

// function getFileContent(fileName, callback) {
//     const fullFileName = path.resolve(__dirname, 'files', fileName)
//     fs.readFile(fullFileName, (err, data) => {
//         if (err) {
//             console.error(err)
//             return
//         }
//         callback(JSON.parse(data.toString()))
//     })
// }

// getFileContent('a.json', aData => {
//     console.log("aData", aData)
//     getFileContent(aData.next, bData => {
//         console.log("bData", bData)
//         getFileContent(bData.next, cData => {
//             console.log("cData", cData)
//         })
//     })
// })


function getFileContent (fileName) {
    const promise = new Promise((resolve, reject) => {
        const fullFileName = path.resolve(__dirname, 'files', fileName)
        fs.readFile(fullFileName, (err, data) => {
            if (err) {
                console.error(err)
                return
            }
            resolve(JSON.parse(data.toString()))
        })
    })
    return promise
}

getFileContent('a.json').then(aData => {
    console.log("aData", aData)
    return getFileContent(aData.next)
}).then(bData => {
    console.log("bData", bData)
    return getFileContent(bData.next)
}).then(cData => {
    console.log("cData", cData)
})