const {Schema, model} = require('mongoose')


const logSchema = new Schema({})


module.exports = model('Log', logSchema, 'Logs')
