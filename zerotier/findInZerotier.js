const request = require('axios')

const networkId = process.env.NETWORK_ID
const zerotierNetworkToken = process.env.ZEROTIER_TOKEN

module.exports = async (id) => {
    try {
        const url = `https://my.zerotier.com/api/network/${networkId}/member/${id}`
        const headers = {
            'Authorization': `Bearer ${zerotierNetworkToken}`
        }

        const response = await request.get(url, {headers})

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