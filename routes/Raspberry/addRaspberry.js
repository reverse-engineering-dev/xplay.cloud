require('rooty')()
const Raspberry = require('^/database/models/Raspberry')
const findInZerotier = require('^/zerotier/findInZerotier')

//TODO check if raspberry is online in mqtt network and set isActive parameter
module.exports = async (req, res, next) => {
    try {
        const {localIp, externIp, zerotierId, zerotierIp, name} = req.body

        //try to find raspberry in zerotier network by network id
        const zerotierEntity = await findInZerotier(zerotierId)
        if (!zerotierEntity) {
            return res.status(404).json({
                msg: "We can't find raspberry in zerotier network, please verify id and try again!"
            })
        }

        //check if another raspberry is not already registered with this zerotier id
        if (await Raspberry.findRaspberryByZerotierId(zerotierId)) {
            return res.status(409).json({
                msg: "This zerotier ID is already used!"
            })
        }

        const raspberry = await new Raspberry({
            localIp, externIp, zerotierId, zerotierIp, name
        }).save()

        res.status(201).json({
            msg: 'New raspberry was created!',
            raspberry
        })

    } catch(e) {
        next(e)
    }
}