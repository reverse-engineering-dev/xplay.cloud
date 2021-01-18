require('rooty')()
const Rasp = require('^/database/models/Raspberry')

module.exports = async (req, res, next) => {
    try {
        const {id} = req.params
        const {zerotierId} = req.body
        const rasp = await Rasp.findRaspberryById(id)

        if (!rasp) {
            return res.status(404).json({
                msg: "Can't find raspberry!"
            })
        }

        await rasp.updateZerotierId(zerotierId)

        res.json({
            msg: 'Zerotier ID was updated!',
            zerotierId: rasp.zerotierId
        })
    } catch (e) {
        next(e)
    }
}