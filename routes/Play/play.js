require('rooty')()
const Xbox = require('^/database/models/Xbox')
const Raspberry = require('^/database/models/Raspberry')
const joinNetwork = require('^/services/mqtt/joinNetworks')

module.exports = async (req, res, next) => {
    const {networkId} = req.user
    const {id} = req.body

    try {
        const raspberry = await Raspberry.findRaspberryById(id)

        if (!raspberry) {
            return res.status(400).json({
                msg: "Can't setup connection, try again!"
            })
        }

        joinNetwork(raspberry._id, networkId)

        res.json({
            msg: 'Raspberry joined network!'
        })
    } catch (e) {
        console.log(e)
        next(e)
    }
}

