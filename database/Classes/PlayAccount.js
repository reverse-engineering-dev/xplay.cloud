require('rooty')()

module.exports = class {
    static findUserAccount(playAccId){
        return this.findbyId(playAccId)
    }
}