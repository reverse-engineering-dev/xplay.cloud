require('rooty')()
const Xbox = require('../../database/models/Xbox')
const Raspberry = require('^/database/models/Raspberry')

module.exports = async (req, res, next) => {
    try {
        const {name, liveId, localIp, raspberryId} = req.body

        const raspberry = await Raspberry.findRaspberryById(raspberryId)

        if (!raspberry) {
            return res.status(209).json({
                msg: "This raspberry doesn't exist!",
            })
        }

        if(await Xbox.findConsoleByLiveId(liveId)){
            return res.status(209).json({
                msg: "Invalid live ID, try again with another!"
            })
        }

        const consoleInfo = {
            name, liveId, localIp, raspberryId
        }

        const console = await new Xbox(consoleInfo)
        await raspberry.bindConsole(console._id)

        await raspberry.save()
        await console.save()

        res.status(201).json({
            msg: 'Xbox was binded to raspberry!',
            consoles: await raspberry.getBindedConsoles()
        })

    } catch (e) {
        next(e)
    }
}