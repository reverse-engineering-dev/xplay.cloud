module.exports = class Xbox {

    static findConsoleByLiveId(liveId) {
        return this.findOne({liveId})
    }

    static findConsoleById(id) {
        return this.findById(id)
    }

    changeStatus(status) {
        this.isAvailable = status
        return this.save()
    }

    //unbind console from raspberry and delete from db
    async deleteConsole() {
        //TODO - find a way to fix import in object method
        //TODO - rewrite method to save delete only at the end to avoid incomplete delete
        const Raspberry = require('../models/Raspberry')
        try {
            await Raspberry.findOneAndUpdate(
                {_id: this.raspberryId},
                {$pull: {consolesList: this._id}},
            )

            this.remove()
        } catch (e) {
            console.error(e)
        }
    }
}