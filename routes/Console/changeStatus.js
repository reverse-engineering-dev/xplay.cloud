require('rooty')()
const Xbox = require('^/database/models/Xbox')


module.exports = async (req, res, next) => {
    try {
        const {id} = req.params
        const {status} = req.body

        const xbox = await Xbox.findConsoleById(id)
        console.log(xbox)

        if(!xbox){
            return res.status(404).json({
                msg: "Console doesn't exist!"
            })
        }

        if (xbox.isAvailable !== status) {
            await xbox.changeStatus(status)

            return res.status(200).json({
                msg: `Status was changed to ${xbox.isAvailable ? 'active' : 'inactive'}`
            })
        }

        return res.status(200).json({
            msg: `Can't change status right now, try again later!`
        })


    } catch (e) {
        next(e)
    }
}