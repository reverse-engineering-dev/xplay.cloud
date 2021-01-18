require('rooty')()
const logger = require('^/winston/logger')

module.exports = async (err, req, res, next) => {
    console.log(err)
    try {
        console.error('Error in xplay :/', err)
        logger.error(err)
    } catch (e) {
        console.log('error on server')
        console.error(err)
    }finally {
        res.status(500).json({
            msg: 'Error on server'
        })
    }
}