const {Schema, model} = require('mongoose')

const raspberrySchema = new Schema({
    localIp: {
        type: String,
        required: true
    },
    externIp: {
        type: String,
        required: true
    },
    consolesList: {
        type: Array,
    },
    zerotierId: {
        type: String,
    },
    zerotierIp: {
        type: String
    },
    isActive: {
        type: Boolean,
        default: false
    }
})

raspberrySchema.loadClass(require('../Classes/Raspberry'))

module.exports = model('Raspberry', raspberrySchema, 'Raspberries')