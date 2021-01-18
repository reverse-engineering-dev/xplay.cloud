require('rooty')()
const axios = require('axios')
const zerotierToken = process.env.ZEROTIER_TOKEN

module.exports = async (req, res, next) => {
    try {
        const {} = req.body

        const networkSetup = {
            config: {
                name: 'Fake_network',
                private: true,

            }
        }

        const url = 'https://my.zerotier.com/api/network'

        const response = await axios.post(url, networkSetup, {
            headers: {
                Authorization: `Bearer ${zerotierToken}`
            }
        })

        res.status(201).json({
            network: response.data
        })

    } catch (e) {
        const {response, request} = e
        if (response || request) {
            switch (e.response.status) {
                case 403:
                    console.log('Response status 403')
                    res.status(403).json({
                        msg: response.statusText || 'Error!'
                    })
                    break;
                default:
                    console.log('Axios error!')
                    res.status(500).json({
                        msg: 'Axios error!'
                    })

            }
        } else {
            res.status(500).json({
                msg: 'Error on server'
            })
        }

        console.log(e)
    }
}