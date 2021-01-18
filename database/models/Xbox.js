const {Schema, model} = require('mongoose')

const consoleSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    joinDate: {
        type: Date,
        required: true,
        default: new Date()
    },
    isConnected: {
        type: Boolean,
        required: true,
        default: false
    },
    isAvailable: {
        type: Boolean,
        required: true,
        default: false
    },
    location: {
        lat: {
            type: String,
        },
        lng: {
            type: String
        },
        city: {
            type: String,
        },
    },
    liveId: {
        type: String,
        required: true,
    },
    localIp: {
        type: String,
        required: true
    },
    otp: {
        type: String
    },
    playTime: {
        type: Number,
        default: 0
    },
    raspberryId: {
        type: String,
        required: true
    },
})


consoleSchema.loadClass(require('../Classes/Xbox'))

module.exports = model('Consoles', consoleSchema, 'Consoles')