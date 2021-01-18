require('rooty')()
const faker = require('faker')
const PlayAccount = require('^/database/models/PlayAccount')

module.exports = async (req, res, next) => {
    try{
        const {amount} = req.body

        for (let i = 0; i < amount; i++) {
            const playAccInfo = {
                email: faker.internet.email(),
                nickname: faker.internet.userName(),
                gametag: faker.lorem.word()
            }

            const acc = new PlayAccount(playAccInfo)
            await acc.save()
            console.log(acc)
        }
        res.end()
    }catch (e) {
        console.log(e)
        res.end()
    }
}