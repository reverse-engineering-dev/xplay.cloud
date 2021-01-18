module.exports = class JwtBlackList {
    static async findToken(token) {
        return this.findOne({token});
    }
}