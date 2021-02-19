const multer = require('multer')
const fs = require('fs')
const path = require('path')
const uniq = require('uniqid')

const avatarsPath = path.join(__dirname, '..//uploads/avatars')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (!fs.existsSync(avatarsPath)) {
            fs.mkdirSync(avatarsPath);
        }
        cb(null, avatarsPath)
    },
    filename: (req, file, cb) => {
        console.log('file', file)
        const filename = uniq(undefined, `.${file.originalname.split('.')[1]}`)
        cb(null, filename)
    }
})


const upload = multer({ storage })

module.exports = upload