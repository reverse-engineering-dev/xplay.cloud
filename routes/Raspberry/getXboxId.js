module.exports = (io) => {
    return async (req, res, next) => {
        const user = req.user
        console.log(`user.nickname`, user.nickname)

        try {
            io.sockets.sockets
                .get(user.raspSocketId)
                .emit(`get xbox id`, { xboxIp: user.clientConfig.xboxIp },
                    (data) => {
                        res.json({
                            ...data
                        })
                    })
        } catch (err) {
            console.log('error', err)
            next(err)
        }
    }
}