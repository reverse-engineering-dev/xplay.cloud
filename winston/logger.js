const {createLogger, transports, format} = require('winston')
const {combine, timestamp, label} = format
const {customError} = require('./formats')
const mongoUrl = process.env.CONNECT_STRING
require('winston-mongodb');

const logger = createLogger({
    level: 'info',
    format: combine(label({label: 'XPlay'}), timestamp(), customError),
    transports: [
        new transports.File({filename: 'info.log', level: 'info'}),
        new transports.File({filename: 'errors.log', level: 'error'}),
        new transports.MongoDB({
            db: mongoUrl,
            collection: 'logs',
            level: 'error'
        })
    ],
    exceptionHandlers: [
        new transports.File({filename: 'exceptions.log'})
    ],
    rejectionHandlers: [
        new transports.File({filename: 'rejections.log'})
    ],
    exitOnError: false,
    defaultMeta: {service: 'user-service'}
})

if (process.env.NODE_ENV !== 'production') {
    logger.add(new transports.Console({
        format: format.simple(),
    }));
}

module.exports = logger