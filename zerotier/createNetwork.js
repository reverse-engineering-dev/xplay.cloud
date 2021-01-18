const zerotierToken = process.env.ZEROTIER_TOKEN
const logger = require('../winston/logger')
const axios = require('axios')

module.exports = async (user) => {
    try {
        const url = 'https://my.zerotier.com/api/network'
        const headers = {
            Authorization: `Bearer ${zerotierToken}`
        }

        const networkInfo = {
            config: {
                name: user._id,
                private: true
            }
        }

        const response = await axios.post(url, networkInfo, {
            headers
        })
        return response.data
    } catch (e) {
        console.log(e)
        logger.error(e)
    }
}