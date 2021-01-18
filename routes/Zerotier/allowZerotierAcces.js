const request = require('axios')

const zerotierNetworkToken = process.env.ZEROTIER_TOKEN

module.exports = async () => {
    try {
        const {networkId, zerotierId} = req.user

        const url = `https://my.zerotier.com/api/network/${networkId}/member/${zerotierId}`
        const headers = {
            'Authorization': `Bearer ${zerotierNetworkToken}`
        }

        user.config.authorized = true

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

