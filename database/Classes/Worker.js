require('rooty')()
const sha512 = require('crypto-js/hmac-sha512')
const secret = process.env.SECRET_KEY


module.exports = class Worker {
    static findWorkerByUsername(username){
        return this.findOne({username})
    }

    static findWorkerById(id){
        return this.findOne({_id: id})
    }

    static hashPassword(password){
        return sha512(password, secret)
    }

    deleteWorker(){
        this.remove()
    }
}

