const {Schema, model} = require('mongoose')

const workerSchema = Schema({
        username: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        cryptoKey: {
            type: String,
        },
        email: {
            type: String,
            required: true,
        },
        raspberriesList: {
            type: Array,
            default: []
        },
        consolesList: {
            type: Array,
            default: []
        },
        zerotierId: {
            type: String,
        },
        zerotierIp: {
            type: String
        },
        ip: {
            type: String,
            required: true
        },
    }
)

workerSchema.loadClass(require('../Classes/Worker'))
module.exports = model('Worker', workerSchema, 'Workers')