require('rooty')()
const Rasp = require('^/database/models/Raspberry')


module.exports = async (req, res, next) => {
    try {
        const {id} = req.params

        const rasp = await Rasp.findRaspberryById(id)

        if (!rasp) {
            return res.status(404).json({
                msg: "Can't find raspberry!"
            })
        }

        res.json({
            zerotierId: rasp.zerotierId
        })
    } catch (e) {
        next(e)
    }
}