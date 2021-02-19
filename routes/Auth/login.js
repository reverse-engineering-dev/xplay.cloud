require('rooty')()
const Player = require('^/database/models/Player')
const jwt = require('jsonwebtoken')

const tokenLife = process.env.TOKEN_LIFE;
const tokenSecret = process.env.TOKEN_SECRET;
const refreshTokenLife = process.env.REFRESH_TOKEN_LIFE;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

module.exports = async (req, res, next) => {
    try {
        const { nickname, password } = req.body
        const { ip } = req.ip
        const player = await Player.findByNickname(nickname, 'firstname lastname email nickname networkId xboxId xboxIp password clientConfig avatar')
        
        if (!player) {
            return res.status(401).json({
                message: {
                    status: 401,
                    msg: 'Authorization error!'
                },
                token: null,
                refreshToken: null,
                user: null
            })
        }

        if (!player.comparePasswords(password)) {
            //USER EXISTS BUT PASSWORD IS WRONG
            // await player.increaseAttempts()
            //
            // //block user if loginAttempts = 3
            // if(player.loginAttempts === 3){
            // 	player.blockPlayer()
            //
            // 	return res.status(401).json({
            // 		msg: "You entered wrong password 3 times, this account was blocked for 1 hour!"
            // 	})
            // }

            return res.status(401).json({
                message: {
                    status: 401,
                    msg: 'Authorization error!'
                },
                token: null,
                refreshToken: null,
                user: null
            })
        }

        const data = {
            uid: player._id,
            ip,
        }

        const token = jwt.sign(data, tokenSecret, {
            expiresIn: tokenLife,
            algorithm: 'HS256'
        })

        const refreshToken = jwt.sign(data, refreshTokenSecret, {
            expiresIn: refreshTokenLife,
            algorithm: 'HS256'
        })


        res.json({
            message: {
                status: 200,
                msg: 'Login success!'
            },
            token,
            refreshToken,
            expiresIn: Date.now() + parseInt(tokenLife),
            user: { ...player._doc, password: undefined, avatar: player.avatar.url }
        })

        player.refreshToken = refreshToken
        await player.save()
    } catch (e) {
        next(e)
    }
}