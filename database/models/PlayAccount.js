const {Schema, model} = require('mongoose')

const PlayAccount = new Schema({
    email: {
        type: String,
        required: true
    },
    nickname: {
        type: String,
        required: true
    },
    gametag: {
        type: String,
        required: true
    }
})

PlayAccount.loadClass(require('../Classes/PlayAccount'))

module.exports = model('PlayAccount', PlayAccount, 'PlayAccounts')