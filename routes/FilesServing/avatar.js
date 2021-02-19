const fs = require('fs')
const path = require('path')
const logger = require('../../winston/logger')

const basePath = path.join(__dirname, '../../uploads/avatars')

module.exports = (req, res, next) => {
    try {
        const { file } = req.params

        res.sendFile(path.join(basePath, `/${file}`))
    } catch (error) {
        console.log('error', error)
        logger.error(error)
        next(error)
    }
}