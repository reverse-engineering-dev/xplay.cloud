const Xbox = require('^/database/models/Xbox')

module.exports = class Raspberry {
    static findRaspberryById(id) {
        return this.findById(id)
    }

    static findRaspberryByZerotierId(zerotierId){
        return this.findOne({zerotierId})
    }

    bindConsole(consoleId){
        this.consolesList.push(consoleId)
    }

    getBindedConsoles(){
        return Xbox.find({_id: {$in: this.consolesList}})
    }

    deleteRaspberry(){
        this.remove()
    }

    updateZerotierId(zerotierId){
        this.zerotierId = zerotierId
        return this.save()
    }
}