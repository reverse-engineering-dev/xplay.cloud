require('rooty')()
const Player = require('^/database/models/Player')
const createNetwork = require('^/zerotier/createNetwork')

module.exports = async (req, res, next) => {
    try {
        const {firstname, lastname, email, nickname, birthday, password, confirmPassword} = req.body

        if (password !== confirmPassword) {
            return res.status(409).json({
                msg: "Passwords doesn't match!"
            })
        }

        if (await Player.findByNickname(nickname)) {
            return res.status(409).json({
                msg: "This nickname is already used!"
            })
        }

        if (await Player.findByEmail(email)) {
            return res.status(409).json({
                msg: "This email is already used!"
            })
        }

        const player = new Player({
            firstname,
            lastname,
            nickname,
            password: Player.hashPassword(password),
            email,
            ip: req.ip, //TODO - find a way to get real ip address
            birthday: new Date()  // TODO - replace with birthdate from front-end
        })
        
        const {id} = await createNetwork(player)
        player.networkId = id
        const result = await player.save()
        console.log(result)
        res.status(201).json({
            msg: `User ${nickname} was successfully created!`
        })
    } catch (e) {
        next(e)
    }
}