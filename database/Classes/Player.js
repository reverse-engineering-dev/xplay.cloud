const { SHA512 } = require('crypto-js')
const secret = process.env.SECRET_KEY

module.exports = class Player {
    static findUserByID(id) {
        return this.findById(id)
    }

    static hashPassword(pass) {
        return SHA512(pass, secret)
    }

    static findByEmail(email) {
        return this.findOne({ email })
    }

    static findByNickname(nickname, fields) {
        return this.findOne({ nickname }).select(fields)
    }

    comparePasswords(pass) {
        return this.password === SHA512(pass, { secret }).toString()
    }

    changePassword(newPass) {
        this.password = SHA512(newPass, secret)
    }

    increaseAttempts() {
        this.loginAttempts += 1
        return this.save()
    }

    blockPlayer() {
        const date = new Date()
        this.nextAttempt = new Date(date.getTime() + 60 * 60000);
    }

    updateZerotierId(id) {
        this.zerotierId = id
    }

    deleteUser() {
        return this.remove()
    }

    updateClientData(data) {
        this.clientConfig = { ...this.clientConfig, ...data }
        this.save()
    }

    updateUserData(data) {
        Object.keys(data).map(key => {
            this[key] = data[key]
        })

        this.save()
    }

    updateAvatar(path) {
        this.avatar.url = path
        this.save()
    }

    configureClient() {
        this.isClientConfigured = true
        this.save()
    }
}