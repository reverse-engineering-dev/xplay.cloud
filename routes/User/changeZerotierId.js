require('rooty')()

const allowZerotierAcces = require('^/zerotier/allowZerotierAcces')
const findInZerotier = require('^/zerotier/findInZerotier')

module.exports = async (req, res, next) => {
    try {
        const {zerotierId} = req.body
        const user = req.user

        if (!(user || zerotierId)) {
            return res.status(400).json({
                msg: 'Error!'
            })
        }

        const zerotierUser = await findInZerotier(zerotierId)

        await user.updateZerotierId(zerotierId)
        const newUser = await allowZerotierAcces(zerotierUser)

        if (newUser) {
            res.json({
                msg: 'Zerotier ID was successful updated!',
                newUser
            })
        }
    } catch (e) {
        console.log(e)
    } finally {
        await req.user.save()
    }
}