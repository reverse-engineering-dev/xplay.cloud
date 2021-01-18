const {Schema, model} = require('mongoose')

const ClientLogSchema = new Schema({
    date: { //log date
        type: Date,
        default: new Date()
    },
    logLevel: { //6 levels of logs
        type: String,
        required: true
    },
    errorSource: { //client || raspberry || server ||
        type: String,
        required: true
    },
    logBody: { //error from console || server ||
        type: String,
    },
    osVersion: {
        type: String,
    },
})

// ClientLogSchema.loadClass(require('../Classes/ClientLogs'))


module.exports = model('ClientLogs', ClientLogSchema, 'ClientLogs')
