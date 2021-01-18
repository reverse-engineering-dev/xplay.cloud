const {printf} = require('winston').format

const customError = printf(({level, message, label, timestamp}) => {
    return `${timestamp} [${label}] ${level}: ${message}`
})

const customInfo = printf(({level, message, label, timestamp}) => {
    return `${timestamp} [${label}] ${level}: ${message}`
})

module.exports = {
    customError,
    customInfo
}