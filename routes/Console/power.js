module.exports = (io) => {
    return async (req, res, next) => {
        const { clientConfig, raspSocketId } = req.user
        const { xboxId, xboxIp } = clientConfig
        const { power } = req.body

        try {
            if (xboxIp && xboxId) {
                io.sockets.sockets
                    .get(raspSocketId)
                    .emit(
                        `xbox power`,
                        { xboxId, xboxIp, power },
                        (data) => {
                            if (data.success) {
                                res.json({ success: true, msg: `Power ${power} success!` })
                            } else {
                                res.json({ success: false, msg: `Failed to power ${power} xbox!` })
                            }
                        }
                    )
            } else {
                res.json({
                    success: false,
                    msg: 'Xbox ip or xbox id is missing!',
                })
            }
        } catch (err) {
            console.log('error', err)
            res.json({ success: false, msg: `Failed to power ${power} xbox!` })
        }
    }
}