module.exports = (io) => {
    return async (req, res, next) => {
        const user = req.user

        try {
            io.sockets.sockets
                .get(user.raspSocketId)
                .emit(
                    `get xbox ip`,
                    { empty: true },
                    (data) => {
                        res.json({ ...data })
                    }
                )
        } catch (err) {
            console.log('error', err)
            next(err)
        }
    }
}