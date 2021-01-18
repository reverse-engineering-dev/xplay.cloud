const request = require('axios')
const zerotierNetworkToken = process.env.ZEROTIER_TOKEN
const findInZerotier = require('./findInZerotier')

module.exports = async (networkId, zerotierId) => {
    let user = undefined
    try {
        user = findInZerotier(zerotierId)
        if (!user) {
            return undefined
        }
    } catch (e) {
        console.log(e)
        return undefined
    }

    try {
        const url = `https://my.zerotier.com/api/network/${networkId}/member/${zerotierId}`
        const headers = {
            'Authorization': `Bearer ${zerotierNetworkToken}`
        }
        user.config = user.config.authorized = true

        const response = await request.post(url, user, {headers})

        if (response.status === 200) {
            return response.data
        }

        return undefined
    } catch (e) {
        if (e.response.status === 404) {
            console.log(e.response.data)
            return undefined
        }
    }
}

