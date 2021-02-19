require('rooty')()
const User = require('^/database/models/Player')

module.exports = async (req, res, next) => {
    try {
        const { id } = req.params
        const user = await User.findUserByID(id)
        console.log('user', user)

        if (!user) {
            return res.status(400).json({
                msg: 'Invalid user id!'
            })
        }

        res.json({
            user
        })
    } catch (e) {
        console.log(e)
        next(e)
    }
}