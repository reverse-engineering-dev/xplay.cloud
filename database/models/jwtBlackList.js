const {Schema, model} = require('mongoose')

const jwtBlackListSchema = new Schema({
    token: {
        type: String,
        required: true
    }
})

jwtBlackListSchema.loadClass(require('../Classes/jwtBlackList'))


module.exports = model('JwtBlackList', jwtBlackListSchema, 'JwtBlackList')
