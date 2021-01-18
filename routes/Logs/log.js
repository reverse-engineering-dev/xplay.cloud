require('rooty')()
const ClientLog = require('^/database/models/ClientLog')

module.exports = async (req, res, next) => {
    try {
        const {logLevel, errorSource, logBody, osVersion} = req.body

        const logInfo = {
            logLevel: logLevel || 'error',
            errorSource,
            logBody,
            osVersion
        }

        const log = new ClientLog(logInfo)
        await log.save()

        res.json({
            log
        })
    } catch (e) {
        console.log(e)
        next(e)
    }
}