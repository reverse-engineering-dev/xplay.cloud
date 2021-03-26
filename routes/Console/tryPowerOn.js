module.exports = (io) => {
    return async (req, res, next) => {
        const user = req.user

        try {
            io.sockets.sockets
                .get(user.raspSocketId)
                .emit(
                    `xbox find start`,
                    { xboxId: user.clientConfig.xboxId },
                    (data) => {
                        if (data.success) {
                            res.json({ success: true, msg: 'Start xbox find!' })
                        } else {
                            res.json({ success: false, msg: 'Failed to start xbox find!' })
                        }
                    }
                )
        } catch (err) {
            console.log('error', err)
            // next(err)
            res.json({ success: false, msg: 'Failed to start xbox find!' })
        }
    }
}