module.exports = (io) => {
    return async (req, res, next) => {
        const vpnClient = req.params.network
        console.log('req.body', req.body)
        const { networkId } = req.body
        const user = req.user

        try {
            if (['zerotier', 'tailscale'].indexOf(vpnClient) !== -1) {
                const { network } = user.clientConfig

                io.sockets.sockets
                    .get(user.raspSocketId)
                    .emit(`join ${vpnClient}`, { networkId },
                        (data) => {
                            res.json({
                                ...data
                            })
                        })
            } else {
                return res.status(400).json({
                    success: false,
                    error: 'Invalid vpn client was served!',
                    ip: null
                })
            }
        } catch (err) {
            console.log('error', err)
            next(err)
        }
    }
}