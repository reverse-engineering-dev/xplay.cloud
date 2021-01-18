const {Schema, model} = require('mongoose')

const playSessionSchema = new Schema({
    raspberryId: {
        type: String,
        required: true
    },
    clientId: {
        type: String,
        required: true
    },
    network: {
        type: String,
        required: true
    },
    
})

// playSessionSchema.loadClass(require('../Classes/Player'))

module.exports = model('playSession', playSessionSchema, 'playSession')