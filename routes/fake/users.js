require('rooty')()

const faker = require('faker')
const User = require('^/database/models/Player')

module.exports = async (req, res, next) => {
    try {
        const {amount} = req.body

        for (let i = 0; i < amount; i++) {
            const pass = faker.internet.password()
            const userInfo = {
                firstname: faker.name.firstName(),
                lastname: faker.name.lastName(),
                nickname: faker.internet.userName(),
                email: faker.internet.email(),
                birthday: new Date(),
                ip: faker.internet.ip(),
                password: pass,
                confirmPassword: pass
            }

            const user = new User(userInfo)
            await user.save()
            console.log(user)
        }

        res.end()
    } catch (e) {
        console.log(e)
        res.end()
    }
}