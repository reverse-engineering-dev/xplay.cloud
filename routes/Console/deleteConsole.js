require('rooty')()
const Xbox = require('^/database/models/Xbox')

module.exports = async (req, res, next) => {
    try {
        const {id} = req.params
        const xbox = await Xbox.findConsoleById(id)

        if (!xbox) {
            return res.status(404).json({
                msg: "Console doesn't exist!"
            })
        }

        if (!xbox.isAvailable) {
            return res.status(409).json({
                msg: 'This console is not available at the moment, try again later!'
            })
        }

        await xbox.deleteConsole()

        res.status(204).json({
            msg: 'Xbox was removed from database!'
        })
    } catch (e) {
        next(e)
    }
}