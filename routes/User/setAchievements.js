require('rooty')()
const User = require('^/database/models/Player')

module.exports = async (req, res, next) => {
    try{
        const {achievements} = req.body
        const user = req.user

        if(!user){
            return res.status(400).json({
                msg: 'User error'
            })
        }

        user.achievements = achievements
    }catch (e) {
        next(e)
    }finally {
        req.user.save()
    }
}